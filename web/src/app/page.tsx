import ScrollWrapper from "@/components/v1/components/ScrollWrapper";
import WhoAmI from "@/components/v1/sections/WhoAmI";
import Experience from "@/components/v1/sections/Experience";
import Publications from "@/components/v1/sections/Publications";
import Skills from "@/components/v1/sections/Skills";
import Projects from "@/components/v1/sections/Projects";
import ExtraCurricular from "@/components/v1/sections/ExtraCurricular";
import Contact from "@/components/v1/sections/Contact";

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
