import Head from "next/head";

interface PageHeadProps {
  title?: string;
  description?: string;
}

const PageHead = ({ title, description }: PageHeadProps) => {
  return (
    <Head>
      <title>Hotel - {title}</title>
      <meta name="description" content={description && "Experience luxury and comfort at Hotel. Book your perfect stay with breathtaking views and unparalleled hospitality."} />
      <meta name="keywords" content="Hotel, Luxury, Accommodation, Booking, Hospitality" />
      <meta property="og:title" content="Hotel - Luxury Accommodation" />
      <meta property="og:description" content="Experience luxury and comfort at Hotel. Book your perfect stay with breathtaking views and unparalleled hospitality." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default PageHead