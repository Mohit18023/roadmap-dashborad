'use client';

import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ProcessingStatus } from '@/lib/utils/types';

interface ProcessingStatusProps {
    status: ProcessingStatus;
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
    const getStatusIcon = () => {
        switch (status.stage) {
            case 'processing':
                return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
            case 'complete':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'error':
                return <XCircle className="h-6 w-6 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (status.stage) {
            case 'processing':
                return 'text-blue-500';
            case 'complete':
                return 'text-green-500';
            case 'error':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    if (status.stage === 'idle') return null;

    return (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div className="flex-1">
                    <p className={`text-sm font-medium ${getStatusColor()}`}>
                        {status.message}
                    </p>
                    {status.stage === 'processing' && (
                        <Progress
                            value={status.progress}
                            className="mt-2"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
