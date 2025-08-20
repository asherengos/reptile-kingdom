import React, { useState } from 'react';
import { speciesProfiles, profileSpecies } from '../data/speciesProfiles';

function AdopterQuiz({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    experience: 1, // 1 beginner – 5 expert
    handlingComfort: 3,
    space: 2, // 1 small shelf – 5 large room/tank
    maintenanceTolerance: 3, // 1 low – 5 high
    activity: 'either', // diurnal/nocturnal/either
    childFriendly: true,
    budgetMonthly: 30,
  });

  if (!isOpen) return null;

  const next = () => setStep(step + 1);
  const back = () => setStep(Math.max(0, step - 1));

  const scoreSpecies = () => {
    // Simple matching: penalize large gaps, reward alignment
    const results = profileSpecies.map(name => {
      const p = speciesProfiles[name];
      let score = 0;
      // Experience vs difficulty
      score += 5 - Math.abs(answers.experience - (6 - p.difficulty));
      // Handling comfort
      score += 5 - Math.abs(answers.handlingComfort - p.handling);
      // Space
      score += 5 - Math.abs(answers.space - p.space);
      // Maintenance
      score += 5 - Math.abs(answers.maintenanceTolerance - p.maintenance);
      // Activity
      if (answers.activity !== 'either') score += answers.activity === p.activity ? 3 : 0;
      // Child friendly
      score += answers.childFriendly ? p.childFriendly : 0;
      // Budget
      score += Math.max(0, 5 - Math.max(0, Math.ceil((p.monthly - answers.budgetMonthly) / 10)));
      return { name, score, profile: p };
    });
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 3);
  };

  const top = scoreSpecies();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Find Your Best Match</h2>
          <button onClick={onClose} className="text-2xl font-bold p-2 hover:bg-white/20 rounded-full">×</button>
        </div>
        <div className="p-6 space-y-6">
          {step === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Your experience level</h3>
              <input type="range" min="1" max="5" value={answers.experience} onChange={e=>setAnswers({...answers, experience:Number(e.target.value)})} className="w-full"/>
              <div className="text-sm text-gray-600 mt-1">1 = beginner • 5 = expert</div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Handling comfort</h3>
              <input type="range" min="1" max="5" value={answers.handlingComfort} onChange={e=>setAnswers({...answers, handlingComfort:Number(e.target.value)})} className="w-full"/>
              <div className="text-sm text-gray-600 mt-1">1 = minimal handling • 5 = very hands-on</div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Available space</h3>
              <input type="range" min="1" max="5" value={answers.space} onChange={e=>setAnswers({...answers, space:Number(e.target.value)})} className="w-full"/>
              <div className="text-sm text-gray-600 mt-1">1 = small shelf • 5 = large dedicated space</div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Maintenance tolerance</h3>
              <input type="range" min="1" max="5" value={answers.maintenanceTolerance} onChange={e=>setAnswers({...answers, maintenanceTolerance:Number(e.target.value)})} className="w-full"/>
              <div className="text-sm text-gray-600 mt-1">1 = very low • 5 = high</div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Activity preference</h3>
              <div className="flex gap-3">
                {['diurnal','nocturnal','either'].map(v=> (
                  <button key={v} onClick={()=>setAnswers({...answers, activity:v})} className={`px-4 py-2 rounded-lg border ${answers.activity===v?'bg-emerald-50 border-emerald-300 text-emerald-700':'bg-white border-gray-300'}`}>{v}</button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Children in the home?</h3>
              <div className="flex gap-3">
                <button onClick={()=>setAnswers({...answers, childFriendly:true})} className={`px-4 py-2 rounded-lg border ${answers.childFriendly?'bg-emerald-50 border-emerald-300 text-emerald-700':'bg-white border-gray-300'}`}>Yes</button>
                <button onClick={()=>setAnswers({...answers, childFriendly:false})} className={`px-4 py-2 rounded-lg border ${!answers.childFriendly?'bg-emerald-50 border-emerald-300 text-emerald-700':'bg-white border-gray-300'}`}>No</button>
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Monthly budget (USD)</h3>
              <input type="range" min="10" max="80" step="5" value={answers.budgetMonthly} onChange={e=>setAnswers({...answers, budgetMonthly:Number(e.target.value)})} className="w-full"/>
              <div className="text-sm text-gray-600 mt-1">${answers.budgetMonthly}/month</div>
            </div>
          )}

          {step >= 7 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Top Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {top.map(item => (
                  <div key={item.name} className="border rounded-xl p-4 bg-white">
                    <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                    <div className="text-sm text-gray-600">Difficulty: {item.profile.difficulty} • Monthly: ${item.profile.monthly}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-3">These suggestions are based on your inputs. Tap a species on the home grid to learn more.</p>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={back} disabled={step===0} className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50">Back</button>
            {step < 7 ? (
              <button onClick={next} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Next</button>
            ) : (
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 text-white">Close</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdopterQuiz;


