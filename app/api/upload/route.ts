import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), 'public/uploads');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.name.split('.').pop();
        const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${ext}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        console.log(`Open ${filepath} to see the uploaded file`);

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });

    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, message: 'Upload failed' },
            { status: 500 }
        );
    }
}
