import { useEffect } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return { set: 'fa' as const, name: 'FaCheckCircle' as const };
      case 'error':
        return { set: 'fa' as const, name: 'FaExclamationCircle' as const };
      case 'info':
        return { set: 'fa' as const, name: 'FaInfoCircle' as const };
      default:
        return { set: 'fa' as const, name: 'FaInfoCircle' as const };
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[999999] max-w-sm">
      <div className={`flex items-center p-4 rounded-lg border ${getColors()} shadow-lg`}>
        <Icon {...getIcon()} className="mr-3" size={20} />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-gray-400 hover:text-gray-600"
        >
          <Icon set="fa" name="FaTimes" size={16} />
        </button>
      </div>
    </div>
  );
} 