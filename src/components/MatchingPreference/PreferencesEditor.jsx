import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const availableSports = [
  "Futsal", "Badminton", "Basketball", "Tennis", "Voli", 
  "Tenis meja","Padel","Golf","Renang", "Sepak Bola", "Rock Climbing"
];

const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "pro", label: "Pro" }
];

export default function PreferencesEditor({
  selectedSports,
  setSelectedSports,
  selectedLevel,
  setSelectedLevel,
  maxDistance,
  setMaxDistance
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSport = (sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleSave = () => {
    console.log({
      sports: selectedSports,
      level: selectedLevel,
      maxDistance: maxDistance
    });
    setIsOpen(false);
  };

  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km} km`;
  };

  return (
    <>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        Edit Preferensi
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-center flex-1">
                  Preferensi Matching
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 py-4">
                {/* Olahraga Favorit */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Olahraga Favorit</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSports.map(sport => (
                      <Badge
                        key={sport}
                        variant={selectedSports.includes(sport) ? "default" : "outline"}
                        className={`py-2 px-3 cursor-pointer transition-all ${
                          selectedSports.includes(sport) 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => toggleSport(sport)}
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Level Skill */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Level Skill</h3>
                  <div className="flex gap-2">
                    {skillLevels.map(level => (
                      <Button
                        key={level.value}
                        variant={selectedLevel === level.value ? "default" : "outline"}
                        className={`flex-1 ${
                          selectedLevel === level.value 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedLevel(level.value)}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Jarak Maksimal */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Jarak Maksimal: <span className="text-green-600">{formatDistance(maxDistance)}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="0.1"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(maxDistance / 15) * 100}%, hsl(var(--input)) ${(maxDistance / 15) * 100}%, hsl(var(--input)) 100%)`
                      }}
                    />
                    
                    <div className="flex justify-between text-xs text-gray-500 px-1">
                      <span>0 m</span>
                      <span>5 km</span>
                      <span>10 km</span>
                      <span>15 km</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {[1, 3, 5, 10, 15].map(distance => (
                      <Button
                        key={distance}
                        variant={maxDistance === distance ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 ${
                          maxDistance === distance 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setMaxDistance(distance)}
                      >
                        {formatDistance(distance)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setIsOpen(false)}
                >
                  Batal
                </Button>
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={handleSave}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}