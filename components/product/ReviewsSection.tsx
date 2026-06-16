'use client';

import { useState } from 'react';
import { Star, StarHalf, ThumbsUp, Flag, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample reviews data - you can replace with real data from your API
const sampleReviews = [
  {
    id: 1,
    userName: 'Ahmed Benali',
    rating: 5,
    date: '2024-05-15',
    title: 'Excellent produit !',
    comment: 'Je suis vraiment satisfait de ce produit. Les performances sont exceptionnelles et la qualité de fabrication est top. Je recommande vivement !',
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    userName: 'Fatima Zahra',
    rating: 4,
    date: '2024-05-10',
    title: 'Très bon rapport qualité/prix',
    comment: 'Produit conforme à la description. Livraison rapide. Seul petit bémol, la batterie pourrait être meilleure.',
    helpful: 12,
    verified: true,
  },
  {
    id: 3,
    userName: 'Karim Tazi',
    rating: 5,
    date: '2024-05-05',
    title: 'Parfait pour le travail',
    comment: 'Utilisé quotidiennement pour le travail, jamais déçu. Puissant et fiable.',
    helpful: 8,
    verified: true,
  },
  {
    id: 4,
    userName: 'Sofia El Amrani',
    rating: 3,
    date: '2024-04-28',
    title: 'Correct sans plus',
    comment: 'Le produit fait le job mais je m\'attendais à mieux niveau finition. Service client réactif cependant.',
    helpful: 5,
    verified: true,
  },
];

interface ReviewsSectionProps {
  productId: string;
  averageRating?: number;
  totalReviews?: number;
}

export default function ReviewsSection({ 
  productId, 
  averageRating = 4.5, 
  totalReviews = 128 
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [userReview, setUserReview] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  const getSortedReviews = () => {
    const sorted = [...sampleReviews];
    if (sortBy === 'recent') {
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'highest') {
      return sorted.sort((a, b) => b.rating - a.rating);
    } else {
      return sorted.sort((a, b) => a.rating - b.rating);
    }
  };

  const displayedReviews = getSortedReviews().slice(0, visibleReviews);
  const hasMoreReviews = visibleReviews < sampleReviews.length;

  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={size} className="fill-yellow-400 text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<Star key={stars.length} size={size} className="text-gray-300" />);
    }
    return stars;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission here
    setShowWriteReview(false);
    setUserRating(0);
    setUserName('');
    setReviewTitle('');
    setUserReview('');
    alert('Merci pour votre avis ! Il sera publié après modération.');
  };

  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Avis clients</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {renderStars(averageRating, 20)}
            </div>
            <span className="text-lg font-semibold text-gray-900">{averageRating}/5</span>
            <span className="text-sm text-gray-500">({totalReviews} avis)</span>
          </div>
        </div>
        <button
          onClick={() => setShowWriteReview(true)}
          className="px-4 py-2 bg-[#E94560] text-white rounded-lg text-sm font-semibold hover:bg-[#c73350] transition-colors"
        >
          Donner mon avis
        </button>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Donner mon avis</h3>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre note *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={cn(
                            'transition-colors',
                            star <= userRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E94560] focus:border-transparent"
                    placeholder="ex: Ahmed Benali"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'avis *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E94560] focus:border-transparent"
                    placeholder="ex: Excellent produit !"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre avis *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E94560] focus:border-transparent"
                    placeholder="Partagez votre expérience avec ce produit..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={userRating === 0}
                  className={cn(
                    'w-full py-2 rounded-lg font-semibold transition-colors',
                    userRating === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#E94560] text-white hover:bg-[#c73350]'
                  )}
                >
                  Publier mon avis
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#E94560] focus:border-transparent"
        >
          <option value="recent">Plus récents</option>
          <option value="highest">Note la plus élevée</option>
          <option value="lowest">Note la plus faible</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                  {review.verified && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                      Achat vérifié
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {review.userName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(review.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                <ThumbsUp size={14} />
                <span>{review.helpful}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMoreReviews && (
        <button
          onClick={() => setVisibleReviews(prev => prev + 3)}
          className="w-full mt-4 py-2 text-center text-sm font-medium text-[#E94560] hover:text-[#c73350] transition-colors border border-gray-200 rounded-lg hover:border-gray-300"
        >
          Voir plus d'avis
        </button>
      )}

      {/* No Reviews State */}
      {sampleReviews.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">Aucun avis pour le moment</p>
          <button
            onClick={() => setShowWriteReview(true)}
            className="mt-2 text-[#E94560] hover:underline"
          >
            Soyez le premier à donner votre avis
          </button>
        </div>
      )}
    </div>
  );
}