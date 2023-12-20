import React from 'react';
import { Link } from 'react-router-dom'
import MainLayout from '@/layouts/Main';

export default function NotFoundPage () {
    return (
    <MainLayout>
        <div className="page-not-found w-full text-center">
            <h1 className='text-5xl text-center mt-24'>404 Not Found!</h1>
            <div className='flex flex-col justify-center items-center'>
                <Link to='/' className='text-3xl mt-8'>Go to Home</Link>
            </div>
            
        </div>
    </MainLayout>
    )
}