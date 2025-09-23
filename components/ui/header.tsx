"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Shield } from "lucide-react"


export function Header() {

    return (
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 print:hidden" >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="hover:bg-card/50 rounded-xl p-2">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex items-center">
                            <div>
                                <h1 className="text-xl font-bold text-gradient">Tix</h1>
                                <p className="text-xs text-muted-foreground">Movie Tickets</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Secure Booking</span>
                    </div>
                </div>
            </div>
        </header>
    )
}