import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Play } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import HeroImage from '../../../../public/Hero.png'

export const PlatformShowcase = () => {
    return (
        <div className="relative mx-auto w-[80%] h-[80vh]">
            <Image
                src={HeroImage}
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                className="opacity-70 border-[14px] border-cyan-900 rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="group flex items-center justify-center w-20 h-20 bg-white bg-opacity-25 rounded-full hover:bg-opacity-40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                            <Play className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                            <span className="sr-only">Play video</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 bg-black">
                        <DialogTitle className="sr-only">Video Content</DialogTitle>
                        <div className="aspect-video">
                            <iframe
                                src="https://drive.google.com/file/d/11QC4TT_2VKsXQn0itPu2VvOR30pUfjT-/preview"
                                allow="autoplay"
                                className="w-full h-full"
                                title="Hero Video"
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
