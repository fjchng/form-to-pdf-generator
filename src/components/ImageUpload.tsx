import React, { useState } from 'react';
import { ImagePlus, X, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { formatFileName, validateImageFile, readFileAsDataURL } from '../lib/utils';

interface ImageUploadProps {
  onChange: (dataUrl: string | null) => void;
  value: string | null;
  label: string;
  required?: boolean;
  error?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label,
  required,
  error,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(error || null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsUploading(true);
      
      // Validate image
      const error = validateImageFile(file);
      if (error) {
        setValidationError(error);
        setIsUploading(false);
        onChange(null);
        return;
      }

      try {
        const dataUrl = await readFileAsDataURL(file);
        setValidationError(null);
        onChange(dataUrl);
      } catch {
        setValidationError('Failed to read image file');
        onChange(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    setFileName(null);
    setValidationError(null);
  };

  return (
    <div className="space-y-2 mb-4">
      <p className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </p>
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          validationError ? 'border-red-500' : value ? 'border-green-500' : 'border-gray-300'
        } hover:border-primary`}
      >
        {!value ? (
          <div className="flex flex-col items-center justify-center py-4">
            <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG (max 5MB)</p>
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              id={`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() =>
                document
                  .getElementById(`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`)
                  ?.click()
              }
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Select Image'}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                <img
                  src={value}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium flex items-center">
                  {fileName ? formatFileName(fileName) : 'Image uploaded'} 
                  <Check className="h-4 w-4 text-green-500 ml-1" />
                </p>
                <p className="text-xs text-gray-500">Click to replace</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              id={`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
          </div>
        )}
      </div>
      {validationError && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {validationError}
        </div>
      )}
    </div>
  );
};