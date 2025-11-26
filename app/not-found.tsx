import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-16">
      <Container className="flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <Image
            src="/404.png"
            alt="404 Not Found"
            width={400}
            height={400}
            className="w-full max-w-md h-auto"
            priority
            unoptimized
          />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/resources">Browse Resources</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

