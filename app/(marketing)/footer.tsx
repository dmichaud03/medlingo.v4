import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
                    <Image 
                    src="/anatomy.jpeg" 
                    alt="Anatomy & Physiology" 
                    height={32} width={40} 
                    className="mr-4 rounded-md"/>
                        Anatomy & Physiology
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                    src="/pharmacology.svg" 
                    alt="Pharmacology" 
                    height={32} 
                    width={40} 
                    className="mr-4 rounded-md"/>
                        Fundamentals
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                    src="/pharmacology.svg" 
                    alt="" 
                    height={32} 
                    width={40} 
                    className="mr-4 rounded-md"/>
                        Maternity
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                    src="/pharmacology.svg" 
                    alt="" 
                    height={32} 
                    width={40} 
                    className="mr-4 rounded-md"/>
                        Pediatrics
                </Button>
                
                <Button size="lg" variant="ghost" className="w-full">
                    <Image 
                    src="/pharmacology.svg" 
                    alt="" 
                    height={32} 
                    width={40} 
                    className="mr-4 rounded-md"/>
                        Pharmacology
                </Button>
                
      </div>
    </div>
  );
};
