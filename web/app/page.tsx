import ScrollWrapper from "@/components/ScrollWrapper";
import WhoAmI from "@/components/WhoAmI";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ExtraCurricular from "@/components/ExtraCurricular";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main className="bg-background min-h-screen">
            <ScrollWrapper />
            <WhoAmI />
            <Skills />
            <Experience />
            <Publications />
            <Projects />
            <ExtraCurricular />
            <Contact />
            <footer className="py-10 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Tanishq Varshney. All rights reserved.
            </footer>
        </main>
    );
}
