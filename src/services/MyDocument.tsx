import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { FormData } from '../components/FormContainer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#222',
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: 'contain',
  },
  businessInfo: {
    marginLeft: 12,
    flexGrow: 1,
  },
  businessName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  businessAddress: {
    fontSize: 10,
    color: '#444',
    marginBottom: 2,
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  invoiceLabel: {
    fontSize: 10,
    color: '#888',
  },
  invoiceValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#222',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#cbd5e1',
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  subtitle: {
    fontSize: 12,
    color: '#444',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoCol: {
    flex: 1,
    marginRight: 12,
  },
  infoColLast: {
    flex: 1,
    marginRight: 0,
  },
  infoLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 11,
    color: '#222',
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    backgroundColor: '#f3f4f6',
    paddingVertical: 4,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
  },
  tableCell: {
    fontSize: 11,
    color: '#222',
    flex: 2,
    paddingRight: 4,
  },
  tableCellDesc: {
    fontSize: 10,
    color: '#888',
    flex: 2,
    paddingRight: 4,
  },
  tableCellQty: {
    fontSize: 11,
    color: '#222',
    flex: 1,
    textAlign: 'right',
  },
  tableCellPrice: {
    fontSize: 11,
    color: '#222',
    flex: 1,
    textAlign: 'right',
  },
  tableCellAmount: {
    fontSize: 11,
    color: '#222',
    flex: 1,
    textAlign: 'right',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  tableFooterLabel: {
    fontSize: 11,
    color: '#888',
    flex: 2,
    textAlign: 'right',
    marginRight: 8,
  },
  tableFooterValue: {
    fontSize: 11,
    color: '#222',
    flex: 1,
    textAlign: 'right',
  },
  totalDue: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 4,
  },
  bottomNote: {
    fontSize: 10,
    color: '#444',
    marginTop: 32,
    textAlign: 'left',
  },
  bottomLink: {
    fontSize: 10,
    color: '#2563eb',
    textDecoration: 'underline',
  },
  pageNum: {
    position: 'absolute',
    bottom: 24,
    right: 40,
    fontSize: 10,
    color: '#888',
  },
});

export const MyDocument = ({ data }: { data: FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.logoBox}>
          {data.primaryImage ? (
            <Image src={data.primaryImage} style={styles.logo} />
          ) : null}
        </View>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>Business Name</Text>
          <Text style={styles.businessAddress}>Street Address, City, Country</Text>
          <Text style={styles.businessAddress}>Zip Code</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceLabel}>Invoice# <Text style={styles.invoiceValue}>00000</Text></Text>
          <Text style={styles.invoiceLabel}>Issue date</Text>
          <Text style={styles.invoiceValue}>mm/dd/yyyy</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {/* Title and message */}
      <Text style={styles.title}>Business name</Text>
      <Text style={styles.subtitle}>Add a message here for your customer.</Text>
      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>BILL TO</Text>
          <Text style={styles.infoValue}>Customer name</Text>
          <Text style={styles.infoValue}>Email address</Text>
          <Text style={styles.infoValue}>Phone number</Text>
          <Text style={styles.infoValue}>Street address</Text>
          <Text style={styles.infoValue}>Zip code, city, country</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>DETAILS</Text>
          <Text style={styles.infoValue}>Enter a brief description</Text>
          <Text style={styles.infoValue}>about your job or project.</Text>
        </View>
        <View style={styles.infoColLast}>
          <Text style={styles.infoLabel}>PAYMENT</Text>
          <Text style={styles.infoValue}>Due date mm/dd/yyyy</Text>
          <Text style={styles.infoValue}>$0.00</Text>
        </View>
      </View>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableCell}>ITEM</Text>
        <Text style={styles.tableCellQty}>QTY</Text>
        <Text style={styles.tableCellPrice}>PRICE</Text>
        <Text style={styles.tableCellAmount}>AMOUNT</Text>
      </View>
      {/* Table Rows */}
      {[1, 2, 3].map((i) => (
        <View style={styles.tableRow} key={i}>
          <View style={{ flex: 2 }}>
            <Text style={styles.tableCell}>Item name</Text>
            <Text style={styles.tableCellDesc}>Describe your item</Text>
          </View>
          <Text style={styles.tableCellQty}>0</Text>
          <Text style={styles.tableCellPrice}>$0.00</Text>
          <Text style={styles.tableCellAmount}>$0.00</Text>
        </View>
      ))}
      {/* Table Footer */}
      <View style={styles.tableFooter}>
        <Text style={styles.tableFooterLabel}>Subtotal</Text>
        <Text style={styles.tableFooterValue}>$000.00</Text>
      </View>
      <View style={styles.tableFooter}>
        <Text style={styles.tableFooterLabel}>Tax</Text>
        <Text style={styles.tableFooterValue}>$000.00</Text>
      </View>
      <View style={styles.tableFooter}>
        <Text style={[styles.tableFooterLabel, styles.totalDue]}>Total Due</Text>
        <Text style={[styles.tableFooterValue, styles.totalDue]}>$000.00</Text>
      </View>
      {/* Bottom Note */}
      <Text style={styles.bottomNote}>
        Want to customize your invoice even more?{"\n"}
        Add taxes, discounts, and service charges with Square Invoices.
        <Text style={styles.bottomLink}> Sign up for Square Invoices free</Text>
      </Text>
      <Text style={styles.pageNum}>Page 1</Text>
    </Page>
  </Document>
); 