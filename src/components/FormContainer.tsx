import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from './ui/FormField';
import { Button } from './ui/Button';
import { ImageUpload } from './ImageUpload';
import { generatePDF } from '../services/pdfGenerator.tsx';

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  primaryImage: string | null;
  secondaryImage: string | null;
}

export const FormContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      primaryImage: null,
      secondaryImage: null,
    },
  });
  
  const primaryImage = watch('primaryImage');
  const secondaryImage = watch('secondaryImage');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Generate and download PDF
      await generatePDF(data);
      
      // Reset form or show success message
      // For this demo, we'll leave the form as is after successful submission
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSubmitError('An error occurred while generating your PDF. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField
            label="Full Name"
            id="fullName"
            required
            {...register('fullName', { required: 'Full name is required' })}
            error={errors.fullName?.message}
          />
          
          <FormField
            label="Email Address"
            id="email"
            type="email"
            required
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={errors.email?.message}
          />
          
          <FormField
            label="Phone Number"
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
          
          <FormField
            label="Company"
            id="company"
            {...register('company')}
            error={errors.company?.message}
          />
        </div>
        
        <div>
          <div className="mb-4">
            <label className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-y"
              {...register('message')}
            />
            {errors.message?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>
          
          <ImageUpload
            label="Primary Image"
            value={primaryImage}
            onChange={(dataUrl) => setValue('primaryImage', dataUrl)}
            required
            error={errors.primaryImage?.message}
          />
          
          <ImageUpload
            label="Secondary Image (Optional)"
            value={secondaryImage}
            onChange={(dataUrl) => setValue('secondaryImage', dataUrl)}
            error={errors.secondaryImage?.message}
          />
        </div>
      </div>
      
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {submitError}
        </div>
      )}
      
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Generate PDF
        </Button>
      </div>
    </form>
  );
};