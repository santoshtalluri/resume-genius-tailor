import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUsers, approveUser, rejectUser, resetUserPassword, createUserByAdmin, deleteUser } from '@/lib/auth';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, AlertTriangle, RefreshCcw, UserPlus, Trash2 } from 'lucide-react';

const UserManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUsersCount, setPendingUsersCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'standard' as 'admin' | 'standard',
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Load users
  useEffect(() => {
    const loadUsers = () => {
      setIsLoading(true);
      try {
        const allUsers = getAllUsers();
        setUsers(allUsers);
        
        // Count pending and active users
        setPendingUsersCount(allUsers.filter(u => !u.isApproved).length);
        setActiveUsersCount(allUsers.filter(u => u.isApproved).length);
      } catch (error) {
        console.error('Error loading users:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading users',
          description: 'There was a problem loading the user list.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, [toast]);
  
  const handleApproveUser = (userId: string) => {
    try {
      const updatedUser = approveUser(userId);
      
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId ? { ...u, isApproved: true } : u
        )
      );
      
      // Update counts
      setPendingUsersCount(prev => prev - 1);
      setActiveUsersCount(prev => prev + 1);
      
      toast({
        title: 'User approved',
        description: `${updatedUser.username} has been approved.`
      });
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        variant: 'destructive',
        title: 'Error approving user',
        description: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };
  
  const handleRejectUser = (userId: string) => {
    try {
      const result = rejectUser(userId);
      
      if (!result) {
        throw new Error('User not found');
      }
      
      // Update local state
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      
      // Update counts
      setPendingUsersCount(prev => prev - 1);
      
      toast({
        title: 'User rejected',
        description: 'The user has been rejected and removed from the system.'
      });
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast({
        variant: 'destructive',
        title: 'Error rejecting user',
        description: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };
  
  const handleResetPassword = async () => {
    if (!selectedUserId || !newPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User ID and new password are required.'
      });
      return;
    }
    
    try {
      const updatedUser = await resetUserPassword(selectedUserId, newPassword);
      
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      setIsResetDialogOpen(false);
      setNewPassword('');
      setSelectedUserId(null);
      
      toast({
        title: 'Password reset',
        description: `Password has been reset for ${updatedUser.username}.`
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        variant: 'destructive',
        title: 'Error resetting password',
        description: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };

  const handleCreateUser = async () => {
    try {
      const createdUser = await createUserByAdmin(
        newUserData.username,
        newUserData.email,
        newUserData.password,
        newUserData.role,
        true
      );
      
      setUsers(prev => [...prev, createdUser]);
      setActiveUsersCount(prev => prev + 1);
      setIsCreateDialogOpen(false);
      setNewUserData({
        username: '',
        email: '',
        password: '',
        role: 'standard'
      });
      
      toast({
        title: 'User created',
        description: `${createdUser.username} has been created successfully.`
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating user',
        description: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    try {
      const result = deleteUser(userId);
      
      if (!result) {
        throw new Error('User not found');
      }
      
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      setActiveUsersCount(prev => prev - 1);
      
      toast({
        title: 'User deleted',
        description: `${username} has been deleted from the system.`
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: 'destructive',
        title: 'Error deleting user',
        description: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsersCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingUsersCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Create a new user account with specified permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newUserData.username}
                onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={newUserData.role}
                onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as 'admin' | 'standard' }))}
              >
                <option value="standard">Standard</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval ({pendingUsersCount})</TabsTrigger>
          <TabsTrigger value="active">Active Users ({activeUsersCount})</TabsTrigger>
          <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Users Pending Approval</CardTitle>
              <CardDescription>
                Approve or reject user registration requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : pendingUsersCount === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No pending approval requests
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter(user => !user.isApproved)
                      .map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.created).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveUser(user.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRejectUser(user.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>
                Manage active user accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : activeUsersCount === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No active users found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter(user => user.isApproved)
                      .map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="capitalize">{user.role}</TableCell>
                          
                          {/* Add delete button to active users table */}
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog open={isResetDialogOpen && selectedUserId === user.id} onOpenChange={(open) => {
                                setIsResetDialogOpen(open);
                                if (!open) setSelectedUserId(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedUserId(user.id)}
                                  >
                                    <RefreshCcw className="h-4 w-4 mr-1" />
                                    Reset Password
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reset Password</DialogTitle>
                                    <DialogDescription>
                                      Set a new password for {user.username}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="new-password">New Password</Label>
                                      <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleResetPassword}>
                                      Reset Password
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the user
                                      account and remove their data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteUser(user.id, user.username)}
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Complete list of all users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No users found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>
                          {user.isApproved ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{new Date(user.created).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
