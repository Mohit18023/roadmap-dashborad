'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import { FileUpload } from '@/components/roadmap/file-upload';
import { RoadmapForm } from '@/components/roadmap/roadmap-form';
import { ProcessingStatus } from '@/components/roadmap/processing-status';
import { extractRoadmapInfo } from '@/lib/services/gemini/extractor';
import { extractTextFromPDF } from '@/lib/services/document/pdf-parser';
import { extractTextFromImage } from '@/lib/services/document/image-parser';
import { DEFAULT_IMAGES, SUPPORTED_FILE_TYPES } from '@/lib/utils/constants';
import type { ExtractedRoadmap, ProcessingStatus as ProcessingStatusType } from '@/lib/utils/types';

export default function CreateRoadmapPage() {
    const router = useRouter();
    const [extractedData, setExtractedData] = useState<ExtractedRoadmap | null>(null);
    const [editedData, setEditedData] = useState<ExtractedRoadmap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatusType>({
        isProcessing: false,
        progress: 0,
        stage: 'idle',
        message: '',
    });

    const handleFileSelect = async (file: File) => {
        setProcessingStatus({
            isProcessing: true,
            progress: 0,
            stage: 'uploading',
            message: 'Uploading document...',
        });

        try {
            let fileContent = '';

            setProcessingStatus({
                isProcessing: true,
                progress: 30,
                stage: 'processing',
                message: 'Extracting text from document...',
            });

            if (file.type === SUPPORTED_FILE_TYPES.PDF) {
                fileContent = await extractTextFromPDF(file);
            } else {
                fileContent = await extractTextFromImage(file);
            }

            setProcessingStatus({
                isProcessing: true,
                progress: 60,
                stage: 'processing',
                message: 'Analyzing content with AI...',
            });

            const extracted = await extractRoadmapInfo(fileContent);
            setExtractedData(extracted);
            setEditedData(extracted);

            setProcessingStatus({
                isProcessing: false,
                progress: 100,
                stage: 'complete',
                message: 'Successfully extracted roadmap information!',
            });

            toast.success('Successfully extracted roadmap information!');
        } catch (error) {
            console.error('Error processing file:', error);
            setProcessingStatus({
                isProcessing: false,
                progress: 0,
                stage: 'error',
                message: 'Failed to process document',
            });
            toast.error('Failed to process document');
        }
    };

    const handleSave = async () => {
        if (!editedData) return;

        setIsLoading(true);
        try {
            // First, create the roadmap
            const roadmapRes = await fetch('/api/roadmaps/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editedData.title,
                    description: editedData.description,
                    image: DEFAULT_IMAGES.ROADMAP,
                }),
            });

            const roadmapData = await roadmapRes.json();

            if (!roadmapRes.ok) throw new Error(roadmapData.message);

            // Create badge for the roadmap
            const badgeRes = await fetch('/api/admin/badges/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${editedData.title} Master`,
                    image: DEFAULT_IMAGES.BADGE,
                    roadmapId: roadmapData.data.id,
                }),
            });

            if (!badgeRes.ok) throw new Error('Failed to create badge');

            // Create subtopics
            const subtopicsRes = await fetch('/api/subtopics/bulk-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roadmapId: roadmapData.data.id,
                    subtopics: editedData.subtopics,
                }),
            });

            if (!subtopicsRes.ok) throw new Error('Failed to create subtopics');

            toast.success('Roadmap created successfully!');
            router.push('/admin/roadmaps');
        } catch (error) {
            console.error('Error creating roadmap:', error);
            toast.error('Failed to create roadmap');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Create Roadmap from Document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        isProcessing={processingStatus.isProcessing}
                    />

                    <ProcessingStatus status={processingStatus} />

                    {editedData && (
                        <RoadmapForm
                            data={editedData}
                            originalData={extractedData!}
                            onChange={setEditedData}
                            onSave={handleSave}
                            isLoading={isLoading}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
