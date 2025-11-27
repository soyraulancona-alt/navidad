
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import StyleSelector from './components/StyleSelector';
import ResultViewer from './components/ResultViewer';
import CustomizationPanel from './components/CustomizationPanel';
import TextEditor from './components/TextEditor';
import StepIndicator from './components/StepIndicator';
import ImageModal from './components/ImageModal';
import { ChristmasStyle, SelectedDecoration, DecorationPosition, PoseOption, TextConfiguration } from './types';
import { STYLES, POSES, TEXT_STYLES } from './constants';
import { fileToGenerativePart, generateChristmasScene } from './services/geminiService';
import { Wand2, Loader2, AlertCircle, Snowflake, ArrowRight, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  // Wizard State
  const [currentStep, setCurrentStep] = useState(0); // 0: Upload, 1: Style, 2: Customize, 3: Text, 4: Result
  const TOTAL_STEPS = 4; // Steps before result

  // Data State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ChristmasStyle>(ChristmasStyle.CLASSIC);
  const [selectedDecorations, setSelectedDecorations] = useState<SelectedDecoration[]>([]);
  const [selectedPose, setSelectedPose] = useState<string>(POSES[0].id);
  const [textConfig, setTextConfig] = useState<TextConfiguration>({ content: '', styleId: TEXT_STYLES[0].id });
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  // Handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResultImage(null);
    setError(null);
    // Auto advance if valid
    // setTimeout(() => setCurrentStep(1), 500); // Optional auto-advance
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setResultImage(null);
    setError(null);
    setCurrentStep(0);
  };

  const handleReset = () => {
    handleClearFile();
    setSelectedDecorations([]);
    setSelectedPose(POSES[0].id);
    setTextConfig({ content: '', styleId: TEXT_STYLES[0].id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleDecoration = (id: string, position: DecorationPosition) => {
    setSelectedDecorations(prev => {
        const existing = prev.find(d => d.id === id);
        if (existing) {
            if (existing.position !== position) {
                 return prev.map(d => d.id === id ? { ...d, position } : d);
            }
            return prev.filter(d => d.id !== id);
        } else {
            return [...prev, { id, position }];
        }
    });
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `hoho-studio-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageBase64 = await fileToGenerativePart(selectedFile);
      const styleOption = STYLES.find(s => s.id === selectedStyle);
      const poseOption = POSES.find(p => p.id === selectedPose) || POSES[0];
      
      if (!styleOption) throw new Error("Estilo no encontrado");

      const generatedImage = await generateChristmasScene(
        imageBase64, 
        styleOption.promptModifier, 
        selectedDecorations,
        poseOption,
        textConfig,
        selectedFile.type
      );

      setResultImage(generatedImage);
      setCurrentStep(TOTAL_STEPS); // Move to result step
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(
        err.message || "Ocurrió un error al generar la imagen. Por favor intenta de nuevo."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Navigation Handlers
  const nextStep = () => {
      if (currentStep < TOTAL_STEPS) setCurrentStep(c => c + 1);
  };
  
  const prevStep = () => {
      if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  // Render Logic
  const renderStepContent = () => {
      switch(currentStep) {
          case 0:
              return (
                  <UploadArea 
                    onFileSelect={handleFileSelect}
                    onClear={handleClearFile}
                    selectedFile={selectedFile}
                    previewUrl={previewUrl}
                    disabled={isGenerating}
                    onImageClick={() => setModalImage(previewUrl)}
                  />
              );
          case 1:
              return (
                <StyleSelector 
                    selectedStyle={selectedStyle}
                    onSelect={setSelectedStyle}
                    disabled={isGenerating}
                />
              );
          case 2:
              return (
                <CustomizationPanel 
                    selectedDecorations={selectedDecorations}
                    onToggleDecoration={handleToggleDecoration}
                    selectedPose={selectedPose}
                    onSelectPose={setSelectedPose}
                    disabled={isGenerating}
                />
              );
          case 3:
              return (
                  <TextEditor 
                    config={textConfig}
                    onChange={setTextConfig}
                    disabled={isGenerating}
                  />
              );
          case 4:
              return resultImage ? (
                <ResultViewer 
                    originalUrl={previewUrl!}
                    resultUrl={resultImage}
                    onDownload={handleDownload}
                    onReset={handleReset}
                    onImageClick={() => setModalImage(resultImage)}
                />
              ) : null;
          default:
              return null;
      }
  };

  return (
    <div className="min-h-screen relative font-sans pb-12 overflow-x-hidden">
        <Header />

        <main className="container mx-auto px-4 relative z-10 pb-20">
            {/* Main Card Container */}
            <div className="bg-white rounded-[2rem] shadow-card max-w-md mx-auto p-5 md:p-8 min-h-[500px] relative flex flex-col">
                
                {/* Decorative Elements on Card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-christmas-red rounded-b-lg opacity-10"></div>

                {/* Progress Bar (Only visible during setup steps) */}
                {currentStep < TOTAL_STEPS && (
                    <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                )}

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 mb-6 rounded-xl flex items-start gap-3 animate-fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Dynamic Content */}
                <div className="flex-1">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons (Footer of Card) */}
                {currentStep < TOTAL_STEPS && (
                    <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100">
                        {currentStep > 0 && (
                            <button 
                                onClick={prevStep}
                                disabled={isGenerating}
                                className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        
                        {currentStep === TOTAL_STEPS - 1 ? (
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !selectedFile}
                                className={`
                                    flex-[3] relative overflow-hidden rounded-xl py-3 shadow-xl transition-all duration-300
                                    ${isGenerating || !selectedFile ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-christmas-red text-white hover:bg-red-700 hover:shadow-2xl hover:-translate-y-1'}
                                `}
                            >
                                <span className="relative z-10 font-bold text-lg flex justify-center items-center gap-2">
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="animate-spin w-6 h-6" />
                                            Creando...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-6 h-6" />
                                            ¡Generar!
                                        </>
                                    )}
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                disabled={currentStep === 0 && !selectedFile}
                                className={`
                                    flex-[3] py-3 px-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg
                                    ${currentStep === 0 && !selectedFile ? 'bg-gray-300 cursor-not-allowed' : 'bg-christmas-red hover:bg-red-700'}
                                `}
                            >
                                Siguiente
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            
            {/* Background Decorations outside card */}
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <div className="fixed top-24 left-4 text-white/10 pointer-events-none transform -rotate-12 hidden lg:block">
                 <Wand2 className="w-24 h-24" />
            </div>
            <div className="fixed bottom-10 right-4 text-white/10 pointer-events-none transform rotate-12 hidden lg:block">
                 <Snowflake className="w-24 h-24" />
            </div>
        </main>

        {/* Modal */}
        <ImageModal 
            isOpen={!!modalImage}
            imageUrl={modalImage}
            onClose={() => setModalImage(null)}
            altText="Vista previa completa"
        />
    </div>
  );
};

export default App;
