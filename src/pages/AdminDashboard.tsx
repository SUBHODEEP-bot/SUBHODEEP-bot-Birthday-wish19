import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BirthdayWish } from '@/types/birthday';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, LogOut, Trash2, Eye, Copy, ExternalLink, Cake, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    fetchWishes();
  }, [isAdmin, navigate]);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('birthday_wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch birthday wishes',
        variant: 'destructive',
      });
    } else {
      setWishes(data as BirthdayWish[]);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, photoUrl: string | null) => {
    if (photoUrl) {
      const path = photoUrl.split('/birthday-photos/')[1];
      if (path) {
        await supabase.storage.from('birthday-photos').remove([path]);
      }
    }

    const { error } = await supabase
      .from('birthday_wishes')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete birthday wish',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '🗑️ Deleted',
        description: 'Birthday wish has been deleted',
      });
      fetchWishes();
    }
  };

  const copyLink = (uniqueId: string) => {
    const url = `${window.location.origin}/birthday/${uniqueId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: '📋 Copied!',
      description: 'Link copied to clipboard',
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAdmin) return null;

  const templateEmojis: Record<string, string> = {
    classic: '🌹',
    colorful: '🌈',
    neon: '⚡',
    dark: '👑',
    kids: '🎪',
    minimal: '✨',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Birthday Admin
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Create magical birthday wishes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
              <Link to="/admin/create">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Create New</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary/30 hover:bg-primary/10">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <div>
                <CardTitle className="text-xl sm:text-2xl">Birthday Wishes</CardTitle>
                <CardDescription className="text-sm">
                  {wishes.length} total wishes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            {isLoading ? (
              <div className="text-center py-12 sm:py-16">
                <div className="text-4xl sm:text-5xl mb-4 animate-bounce">🎂</div>
                <p className="text-muted-foreground">Loading birthday wishes...</p>
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Cake className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No birthday wishes yet</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Create your first birthday page to spread joy!
                </p>
                <Button asChild className="bg-gradient-to-r from-primary to-secondary">
                  <Link to="/admin/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Birthday Page
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block md:hidden space-y-4">
                  {wishes.map((wish) => (
                    <Card key={wish.id} className="border-primary/10 overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          {wish.photo_url ? (
                            <img
                              src={wish.photo_url}
                              alt={wish.person_name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shadow"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Cake className="w-7 h-7 text-primary/50" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">{wish.person_name}</h3>
                            <p className="text-sm text-muted-foreground">From: {wish.sender_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-xs">
                            <span>{templateEmojis[wish.template] || '🎂'}</span>
                            <span className="capitalize">{wish.template}</span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(wish.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyLink(wish.unique_id)}
                            className="flex-1"
                          >
                            <Copy className="w-4 h-4 mr-1.5" />
                            Copy Link
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link to={`/birthday/${wish.unique_id}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Birthday Page?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the birthday page for <strong>{wish.person_name}</strong>.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(wish.id, wish.photo_url)}
                                  className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Template</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wishes.map((wish) => (
                        <TableRow key={wish.id} className="hover:bg-primary/5">
                          <TableCell>
                            {wish.photo_url ? (
                              <img
                                src={wish.photo_url}
                                alt={wish.person_name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shadow"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <Cake className="w-7 h-7 text-primary/50" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold text-lg">{wish.person_name}</TableCell>
                          <TableCell className="text-muted-foreground">{wish.sender_name}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm">
                              <span>{templateEmojis[wish.template] || '🎂'}</span>
                              <span className="capitalize">{wish.template}</span>
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(wish.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyLink(wish.unique_id)}
                                title="Copy Link"
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                title="Preview"
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Link to={`/birthday/${wish.unique_id}`} target="_blank">
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                title="Open in New Tab"
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <a href={`/birthday/${wish.unique_id}`} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Birthday Page?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the birthday page for <strong>{wish.person_name}</strong>. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(wish.id, wish.photo_url)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;