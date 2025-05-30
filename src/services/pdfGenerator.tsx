import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, pdf } from '@react-pdf/renderer';
import { FormData } from '../components/FormContainer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#0F52BA',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#0F52BA',
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  value: {
    fontSize: 14,
  },
  imagesContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: 200,
    objectFit: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  imageCaption: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
});

// PDF Document component
const MyDocument = ({ data }: { data: FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Form Submission</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{data.fullName}</Text>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        
        {data.phone && (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{data.phone}</Text>
          </View>
        )}
        
        {data.company && (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{data.company}</Text>
          </View>
        )}
      </View>
      
      {data.message && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message</Text>
          <Text style={styles.value}>{data.message}</Text>
        </View>
      )}
      
      <View style={styles.imagesContainer}>
        {data.primaryImage && (
          <View style={styles.imageContainer}>
            <Image src={data.primaryImage} style={styles.image} />
            <Text style={styles.imageCaption}>Primary Image</Text>
          </View>
        )}
        
        {data.secondaryImage && (
          <View style={styles.imageContainer}>
            <Image src={data.secondaryImage} style={styles.image} />
            <Text style={styles.imageCaption}>Secondary Image</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
      </Text>
    </Page>
  </Document>
);

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