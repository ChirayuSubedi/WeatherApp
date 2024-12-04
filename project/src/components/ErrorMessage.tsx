import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 text-red-500 p-4 bg-red-50 rounded-lg">
      <AlertTriangle size={20} />
      <span>{message}</span>
    </div>
  );
}