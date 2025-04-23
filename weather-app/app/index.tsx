import Head from 'next/head';
import WeatherCard from '@/components/WeatherCard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather forecast application" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4">
        <div className="container mx-auto">
          <WeatherCard />
        </div>
      </main>
    </>
  );
}