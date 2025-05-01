'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Save, Loader2, Plus, Trash2 } from "lucide-react";
import type { ExtractedRoadmap } from '@/lib/utils/types';

interface RoadmapFormProps {
    data: ExtractedRoadmap;
    originalData: ExtractedRoadmap;
    onChange: (data: ExtractedRoadmap) => void;
    onSave: () => void;
    isLoading: boolean;
}

export function RoadmapForm({
    data,
    originalData,
    onChange,
    onSave,
    isLoading
}: RoadmapFormProps) {
    const handleSubtopicChange = (index: number, field: 'title' | 'description', value: string) => {
        const newSubtopics = [...data.subtopics];
        newSubtopics[index] = {
            ...newSubtopics[index],
            [field]: value
        };
        onChange({ ...data, subtopics: newSubtopics });
    };

    const addSubtopic = () => {
        onChange({
            ...data,
            subtopics: [
                ...data.subtopics,
                { title: '', description: '' }
            ]
        });
    };

    const removeSubtopic = (index: number) => {
        const newSubtopics = data.subtopics.filter((_, i) => i !== index);
        onChange({ ...data, subtopics: newSubtopics });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                    value={data.title}
                    onChange={(e) => onChange({ ...data, title: e.target.value })}
                    placeholder="Enter roadmap title"
                    className="mt-1"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                    value={data.description}
                    onChange={(e) => onChange({ ...data, description: e.target.value })}
                    placeholder="Enter roadmap description"
                    rows={4}
                    className="mt-1"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium">Subtopics</label>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addSubtopic}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subtopic
                    </Button>
                </div>

                <div className="space-y-4">
                    {data.subtopics.map((subtopic, index) => (
                        <div key={index} className="p-4 border rounded-lg relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => removeSubtopic(index)}
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>

                            <Input
                                value={subtopic.title}
                                onChange={(e) => handleSubtopicChange(index, 'title', e.target.value)}
                                placeholder="Subtopic title"
                                className="mb-2"
                            />
                            <Textarea
                                value={subtopic.description}
                                onChange={(e) => handleSubtopicChange(index, 'description', e.target.value)}
                                placeholder="Subtopic description"
                                rows={3}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    variant="outline"
                    onClick={() => onChange(originalData)}
                    disabled={isLoading}
                >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Reset Changes
                </Button>
                <Button
                    onClick={onSave}
                    disabled={isLoading || !data.title || !data.description || data.subtopics.length === 0}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Create Roadmap
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
