import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div>
            <main>
                <Navbar />
                { children }
                <Footer />
            </main>
        </div>
    );
};

export default MainLayout;