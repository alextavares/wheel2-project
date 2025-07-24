'use client';

import { useState, useEffect } from 'react';

interface Participant {
  id: string;
  name: string;
  score: number;
  eliminated: boolean;
  avatar?: string;
}

interface Round {
  id: string;
  number: number;
  participants: Participant[];
  winner?: Participant;
  completed: boolean;
  timestamp: Date;
}

interface CompetitionModeProps {
  items: Array<{ id: string; label: string; color: string }>;
  onClose: () => void;
  onStartCompetition: (participants: Participant[]) => void;
}

export function CompetitionMode({ items, onClose, onStartCompetition }: CompetitionModeProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [competitionStarted, setCompetitionStarted] = useState(false);
  const [competitionType, setCompetitionType] = useState<'elimination' | 'points' | 'tournament'>('elimination');
  const [maxRounds, setMaxRounds] = useState(5);
  const [pointsPerWin, setPointsPerWin] = useState(10);

  // Inicializar participantes a partir dos itens da roda
  useEffect(() => {
    const initialParticipants = items.map((item, index) => ({
      id: item.id,
      name: item.label,
      score: 0,
      eliminated: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.label}&backgroundColor=${item.color.replace('#', '')}`
    }));
    setParticipants(initialParticipants);
  }, [items]);

  const startCompetition = () => {
    if (participants.length < 2) return;
    
    setCompetitionStarted(true);
    const firstRound: Round = {
      id: `round-1`,
      number: 1,
      participants: participants.filter(p => !p.eliminated),
      completed: false,
      timestamp: new Date()
    };
    setCurrentRound(firstRound);
    setRounds([firstRound]);
    onStartCompetition(participants);
  };

  const completeRound = (winner: Participant) => {
    if (!currentRound) return;

    const updatedRound = {
      ...currentRound,
      winner,
      completed: true
    };

    let updatedParticipants = [...participants];

    if (competitionType === 'elimination') {
      // Eliminar todos exceto o vencedor
      updatedParticipants = updatedParticipants.map(p => ({
        ...p,
        eliminated: p.id !== winner.id ? true : p.eliminated
      }));
    } else if (competitionType === 'points') {
      // Adicionar pontos ao vencedor
      updatedParticipants = updatedParticipants.map(p => ({
        ...p,
        score: p.id === winner.id ? p.score + pointsPerWin : p.score
      }));
    }

    setParticipants(updatedParticipants);
    setRounds(prev => [...prev.slice(0, -1), updatedRound]);

    // Verificar se a competição terminou
    const activeParticipants = updatedParticipants.filter(p => !p.eliminated);
    const shouldContinue = competitionType === 'elimination' 
      ? activeParticipants.length > 1 
      : rounds.length < maxRounds;

    if (shouldContinue) {
      // Próxima rodada
      const nextRound: Round = {
        id: `round-${rounds.length + 1}`,
        number: rounds.length + 1,
        participants: competitionType === 'elimination' ? activeParticipants : updatedParticipants,
        completed: false,
        timestamp: new Date()
      };
      setCurrentRound(nextRound);
      setRounds(prev => [...prev, nextRound]);
    } else {
      setCurrentRound(null);
    }
  };

  const resetCompetition = () => {
    setCompetitionStarted(false);
    setCurrentRound(null);
    setRounds([]);
    setParticipants(prev => prev.map(p => ({ ...p, score: 0, eliminated: false })));
  };

  const getLeaderboard = () => {
    return [...participants]
      .filter(p => !p.eliminated)
      .sort((a, b) => b.score - a.score);
  };

  const exportResults = () => {
    const results = {
      competitionType,
      totalRounds: rounds.length,
      participants: participants.map(p => ({
        name: p.name,
        score: p.score,
        eliminated: p.eliminated,
        finalPosition: getLeaderboard().findIndex(lp => lp.id === p.id) + 1
      })),
      rounds: rounds.map(r => ({
        number: r.number,
        winner: r.winner?.name,
        timestamp: r.timestamp
      }))
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `competition-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isCompetitionComplete = currentRound === null && competitionStarted;
  const winner = competitionType === 'elimination' 
    ? participants.find(p => !p.eliminated)
    : getLeaderboard()[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50">
        <div className="p-8 border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 leading-tight">
              <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              🏆 Modo Competição
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8">
          {!competitionStarted ? (
            <div className="space-y-8">
              {/* Configurações da Competição */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3 leading-tight">
                    🎯 Tipo de Competição
                  </label>
                  <select
                    value={competitionType}
                    onChange={(e) => setCompetitionType(e.target.value as any)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-semibold text-gray-700 bg-white/80 backdrop-blur-sm shadow-md"
                  >
                    <option value="elimination">🔥 Eliminação</option>
                    <option value="points">⭐ Por Pontos</option>
                    <option value="tournament">🏆 Torneio</option>
                  </select>
                </div>

                {competitionType === 'points' && (
                  <>
                    <div>
                      <label className="block text-base font-bold text-gray-800 mb-3 leading-tight">
                        🎯 Máximo de Rodadas
                      </label>
                      <input
                        type="number"
                        value={maxRounds}
                        onChange={(e) => setMaxRounds(parseInt(e.target.value))}
                        min="1"
                        max="20"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-semibold text-gray-700 bg-white/80 backdrop-blur-sm shadow-md"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-gray-800 mb-3 leading-tight">
                        ⭐ Pontos por Vitória
                      </label>
                      <input
                        type="number"
                        value={pointsPerWin}
                        onChange={(e) => setPointsPerWin(parseInt(e.target.value))}
                        min="1"
                        max="100"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-semibold text-gray-700 bg-white/80 backdrop-blur-sm shadow-md"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Lista de Participantes */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                  👥 Participantes ({participants.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-gray-800 text-base leading-tight">{participant.name}</div>
                        <div className="text-sm text-gray-600 font-semibold">✅ Pronto para competir</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={startCompetition}
                disabled={participants.length < 2}
                className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg text-lg"
              >
                🚀 Iniciar Competição
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Status da Competição */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold leading-tight">
                      {isCompetitionComplete ? '🎉 Competição Finalizada!' : `🔥 Rodada ${currentRound?.number || 0}`}
                    </h3>
                    <p className="text-blue-100 font-semibold text-base mt-2">
                      {competitionType === 'elimination' 
                        ? `${participants.filter(p => !p.eliminated).length} participantes restantes`
                        : `${rounds.filter(r => r.completed).length}/${maxRounds} rodadas completas`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{rounds.filter(r => r.completed).length}</div>
                    <div className="text-sm text-blue-100 font-semibold">Rodadas</div>
                  </div>
                </div>
              </div>

              {/* Vencedor Final */}
              {isCompetitionComplete && winner && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl text-center shadow-lg">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-3xl font-bold mb-4 leading-tight">Campeão!</h3>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={winner.avatar}
                      alt={winner.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className="text-2xl font-bold leading-tight">{winner.name}</div>
                      {competitionType === 'points' && (
                        <div className="text-yellow-100 font-semibold text-lg">{winner.score} pontos</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Placar/Ranking */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                  {competitionType === 'elimination' ? '📊 Status dos Participantes' : '🏅 Placar'}
                </h3>
                <div className="space-y-3">
                  {getLeaderboard().map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 shadow-md transition-all duration-200 ${
                        participant.eliminated 
                          ? 'bg-red-50/80 border-red-200 opacity-60' 
                          : index === 0 
                            ? 'bg-yellow-50/80 border-yellow-300 shadow-lg' 
                            : 'bg-gray-50/80 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-sm ${
                          index === 0 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-gray-800 text-base leading-tight">{participant.name}</div>
                          <div className="text-sm text-gray-600 font-semibold">
                            {participant.eliminated ? '❌ Eliminado' : '✅ Ativo'}
                          </div>
                        </div>
                      </div>
                      {competitionType === 'points' && (
                        <div className="text-xl font-bold text-gray-800">
                          {participant.score} pts
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Histórico de Rodadas */}
              {rounds.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 leading-tight">📜 Histórico</h3>
                  <div className="space-y-3">
                    {rounds.filter(r => r.completed).map((round) => (
                      <div key={round.id} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 shadow-md">
                        <div>
                          <div className="font-bold text-gray-800 text-base leading-tight">🎯 Rodada {round.number}</div>
                          <div className="text-sm text-gray-600 font-semibold">
                            🕒 {round.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 font-semibold">Vencedor:</span>
                          <span className="font-bold text-green-600 text-base">🏆 {round.winner?.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="flex gap-4">
                <button
                  onClick={resetCompetition}
                  className="flex-1 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg text-base"
                >
                  🔄 Reiniciar
                </button>
                <button
                  onClick={exportResults}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg text-base"
                >
                  📊 Exportar Resultados
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}