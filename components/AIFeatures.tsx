
import React, { useState } from 'react';
import { editImage, generateImage, complexQuery, fileToBase64 } from '../services/geminiService';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type AITab = 'edit' | 'generate' | 'think';

const AIFeatures: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [activeTab, setActiveTab] = useState<AITab>('edit');

    // States for Image Editor
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editPrompt, setEditPrompt] = useState<string>('');
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // States for Image Generator
    const [genPrompt, setGenPrompt] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // States for Thinking Mode
    const [complexPrompt, setComplexPrompt] = useState<string>('');
    const [complexResponse, setComplexResponse] = useState<string>('');
    const [isThinking, setIsThinking] = useState(false);
    
    const [error, setError] = useState<string | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setEditedImage(null);
        }
    };
    
    const handleEditSubmit = async () => {
        if (!imageFile || !editPrompt) {
            setError("Please upload an image and provide an editing prompt.");
            return;
        }
        setIsEditing(true);
        setError(null);
        setEditedImage(null);
        try {
            const base64Image = await fileToBase64(imageFile);
            const result = await editImage(base64Image, imageFile.type, editPrompt);
            setEditedImage(`data:image/png;base64,${result}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred during image editing.");
            console.error(e);
        } finally {
            setIsEditing(false);
        }
    };

    const handleGenerateSubmit = async () => {
        if (!genPrompt) {
            setError("Please provide a prompt for image generation.");
            return;
        }
        setIsGenerating(true);
        setError(null);
        setGeneratedImage(null);
        try {
            const result = await generateImage(genPrompt);
            setGeneratedImage(`data:image/jpeg;base64,${result}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred during image generation.");
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleThinkSubmit = async () => {
        if (!complexPrompt) {
            setError("Please provide a complex query.");
            return;
        }
        setIsThinking(true);
        setError(null);
        setComplexResponse('');
        try {
            const result = await complexQuery(complexPrompt);
            setComplexResponse(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred while thinking.");
            console.error(e);
        } finally {
            setIsThinking(false);
        }
    };
    
    const TabButton: React.FC<{tab: AITab, label: string}> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-pink-blush text-ink dark:bg-gold dark:text-ink' : 'text-slate hover:bg-gray-100 dark:text-gold-dark dark:hover:bg-gold/10'}`}
        >
            {label}
        </button>
    );

    return (
        <section id="ai-tools" className="py-24 bg-white dark:bg-transparent">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-gold-light">AI Studio Tools</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">Experiment with cutting-edge AI, powered by Google Gemini.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-ink-light rounded-lg shadow-lg p-4 sm:p-8">
                    <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 border-b border-gray-200 dark:border-gold-dark/50 pb-4">
                        <TabButton tab="edit" label="Image Editor" />
                        <TabButton tab="generate" label="Image Generator" />
                        <TabButton tab="think" label="Thinking Mode" />
                    </div>

                    {error && <div className="bg-error/20 border border-error text-error px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}

                    {/* Image Editor */}
                    <div className={activeTab === 'edit' ? 'block' : 'hidden'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="file-upload" className="block text-sm font-medium text-ink dark:text-gray-200 mb-2">Upload Image</label>
                                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-blush/20 file:text-pink-hover hover:file:bg-pink-blush/30 dark:file:bg-gold/20 dark:file:text-gold-light dark:hover:file:bg-gold/30"/>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg shadow-md max-h-64 w-auto mx-auto"/>}
                            </div>
                            <div>
                                <label htmlFor="edit-prompt" className="block text-sm font-medium text-ink dark:text-gray-200 mb-2">Edit Prompt</label>
                                <textarea id="edit-prompt" value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} placeholder="e.g., Add a retro filter" rows={3} className="w-full p-2 border border-gray-300 rounded-md dark:bg-ink dark:border-gold-dark focus:ring-gold focus:border-gold"></textarea>
                                <button onClick={handleEditSubmit} disabled={isEditing} className="mt-4 w-full bg-pink-blush text-ink font-semibold py-2 px-4 rounded-lg hover:bg-pink-hover disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-gold dark:text-ink dark:hover:bg-gold-light dark:disabled:bg-gray-700 dark:disabled:text-gray-400">
                                    {isEditing ? 'Editing...' : 'Apply Edit'}
                                </button>
                            </div>
                        </div>
                        {editedImage && (
                             <div className="mt-8 text-center">
                                <h3 className="text-xl font-poppins font-semibold mb-4 text-ink dark:text-gold">Edited Result</h3>
                                <img src={editedImage} alt="Edited result" className="rounded-lg shadow-md max-h-96 w-auto mx-auto"/>
                            </div>
                        )}
                    </div>
                    
                    {/* Image Generator */}
                     <div className={activeTab === 'generate' ? 'block' : 'hidden'}>
                        <div>
                            <label htmlFor="gen-prompt" className="block text-sm font-medium text-ink dark:text-gray-200 mb-2">Generation Prompt</label>
                            <textarea id="gen-prompt" value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} placeholder="e.g., An elegant, minimalist logo for a lash studio" rows={3} className="w-full p-2 border border-gray-300 rounded-md dark:bg-ink dark:border-gold-dark focus:ring-gold focus:border-gold"></textarea>
                            <button onClick={handleGenerateSubmit} disabled={isGenerating} className="mt-4 w-full bg-pink-blush text-ink font-semibold py-2 px-4 rounded-lg hover:bg-pink-hover disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-gold dark:text-ink dark:hover:bg-gold-light dark:disabled:bg-gray-700 dark:disabled:text-gray-400">
                                {isGenerating ? 'Generating...' : 'Generate Image'}
                            </button>
                        </div>
                        {generatedImage && (
                             <div className="mt-8 text-center">
                                <h3 className="text-xl font-poppins font-semibold mb-4 text-ink dark:text-gold">Generated Image</h3>
                                <img src={generatedImage} alt="Generated result" className="rounded-lg shadow-md max-h-96 w-auto mx-auto"/>
                            </div>
                        )}
                    </div>

                    {/* Thinking Mode */}
                     <div className={activeTab === 'think' ? 'block' : 'hidden'}>
                        <div>
                            <label htmlFor="complex-prompt" className="block text-sm font-medium text-ink dark:text-gray-200 mb-2">Your Complex Query</label>
                            <textarea id="complex-prompt" value={complexPrompt} onChange={(e) => setComplexPrompt(e.target.value)} placeholder="Ask a complex question that requires deep reasoning..." rows={5} className="w-full p-2 border border-gray-300 rounded-md dark:bg-ink dark:border-gold-dark focus:ring-gold focus:border-gold"></textarea>
                            <button onClick={handleThinkSubmit} disabled={isThinking} className="mt-4 w-full bg-pink-blush text-ink font-semibold py-2 px-4 rounded-lg hover:bg-pink-hover disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-gold dark:text-ink dark:hover:bg-gold-light dark:disabled:bg-gray-700 dark:disabled:text-gray-400">
                                {isThinking ? 'Thinking...' : 'Submit Query'}
                            </button>
                        </div>
                        {complexResponse && (
                             <div className="mt-8">
                                <h3 className="text-xl font-poppins font-semibold mb-4 text-ink dark:text-gold">Gemini's Response</h3>
                                <div className="prose dark:prose-invert max-w-none p-4 bg-white dark:bg-ink rounded-md whitespace-pre-wrap">{complexResponse}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIFeatures;