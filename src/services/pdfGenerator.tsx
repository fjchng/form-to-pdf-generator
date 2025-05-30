import { pdf } from '@react-pdf/renderer';
import { FormData } from '../components/FormContainer';
import { MyDocument } from './MyDocument';

export const generatePDF = async (data: FormData): Promise<void> => {
  const blob = await pdf(<MyDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};