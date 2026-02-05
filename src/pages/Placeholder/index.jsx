import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft, Coffee } from 'lucide-react';

export default function PlaceholderPage({ title, description }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Coffee className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-caramel/20 flex items-center justify-center">
          <Construction className="w-5 h-5 text-caramel" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">{description}</p>
      
      <div className="bg-card border rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-muted-foreground mb-4">
          This module is part of the MagicRoast Qoffee ERP system. 
          Full functionality is being developed.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['CRUD Operations', 'Data Tables', 'Forms', 'Search & Filter', 'Export'].map((feature) => (
            <span key={feature} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
              {feature}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 btn-secondary inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}