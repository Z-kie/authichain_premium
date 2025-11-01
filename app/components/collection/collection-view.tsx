
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search,
  Grid,
  List,
  Filter,
  Image as ImageIcon,
  Calendar,
  Tag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CollectionViewProps {
  user: any;
  nfts: any[];
}

export function CollectionView({ user, nfts }: CollectionViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterByBlockchain, setFilterByBlockchain] = useState('all');

  const filteredNfts = nfts?.filter((nft) => {
    const matchesSearch = nft.title?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
                         nft.description?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '');
    const matchesBlockchain = filterByBlockchain === 'all' || nft.blockchain === filterByBlockchain;
    return matchesSearch && matchesBlockchain;
  }) || [];

  const sortedNfts = [...filteredNfts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return (a.title || '').localeCompare(b.title || '');
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const blockchains = Array.from(new Set(nfts?.map(nft => nft.blockchain) || []));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My NFT Collection
          </h1>
          <p className="text-gray-400 text-lg">
            {nfts?.length || 0} NFTs in your collection
          </p>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div 
        className="mb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={filterByBlockchain} onValueChange={setFilterByBlockchain}>
              <SelectTrigger className="w-[140px] bg-white/10 border-gray-600 text-white">
                <SelectValue placeholder="Blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                {blockchains.map((blockchain) => (
                  <SelectItem key={blockchain} value={blockchain}>
                    {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px] bg-white/10 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex rounded-lg border border-gray-600 overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* NFT Collection */}
      {sortedNfts?.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-md mx-auto">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {nfts?.length === 0 ? 'No NFTs in your collection' : 'No NFTs match your search'}
            </h3>
            <p className="text-gray-400 mb-6">
              {nfts?.length === 0 
                ? 'Start building your collection by uploading your first NFT' 
                : 'Try adjusting your search or filters to find what you\'re looking for'
              }
            </p>
            {nfts?.length === 0 && (
              <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Link href="/upload">Upload Your First NFT</Link>
              </Button>
            )}
          </div>
        </motion.div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedNfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="group bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
                <div className="aspect-square relative bg-gray-800">
                  <Image
                    src={nft.imageUrl}
                    alt={nft.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white text-lg mb-2 truncate">
                    {nft.title}
                  </h3>
                  
                  {nft.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {nft.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs capitalize">
                      {nft.blockchain}
                    </Badge>
                    
                    {nft.tokenId && (
                      <span className="text-xs text-gray-400">
                        #{nft.tokenId}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedNfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <Image
                        src={nft.imageUrl}
                        alt={nft.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg mb-1 truncate">
                        {nft.title}
                      </h3>
                      
                      {nft.description && (
                        <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                          {nft.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="text-xs capitalize">
                          {nft.blockchain}
                        </Badge>
                        
                        {nft.tokenId && (
                          <span className="text-xs text-gray-400">
                            Token #{nft.tokenId}
                          </span>
                        )}
                        
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(nft.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
