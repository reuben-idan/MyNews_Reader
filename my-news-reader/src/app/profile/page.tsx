'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiSettings, FiBell, FiClock, FiTag, FiSave, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/types';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isAuthenticated, updatePreferences, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    categories: [] as string[],
    sources: [] as string[],
    readingTime: 'medium' as 'short' | 'medium' | 'long',
    notifications: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setPreferences(user.preferences);
    }
  }, [isAuthenticated, user, router]);

  const handleCategoryToggle = (categoryId: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      updatePreferences(preferences);
      toast.success('Preferences saved successfully!');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const tabs = [
    { id: 'preferences', name: 'Preferences', icon: FiSettings },
    { id: 'account', name: 'Account', icon: FiUser },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              <nav className="border-t border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-6 py-3 text-sm font-medium border-r-2 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {activeTab === 'preferences' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">News Preferences</h2>

                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FiTag className="w-4 h-4 mr-2" />
                      Categories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <label key={category.id} className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.categories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="sr-only"
                          />
                          <div className={`w-full py-2 px-3 text-sm rounded-md border cursor-pointer transition-colors ${
                            preferences.categories.includes(category.id)
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}>
                            {category.name}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reading Time */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FiClock className="w-4 h-4 mr-2" />
                      Preferred Reading Time
                    </h3>
                    <div className="space-y-2">
                      {[
                        { value: 'short', label: 'Short (1-3 minutes)' },
                        { value: 'medium', label: 'Medium (3-7 minutes)' },
                        { value: 'long', label: 'Long (7+ minutes)' },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="readingTime"
                            value={option.value}
                            checked={preferences.readingTime === option.value}
                            onChange={(e) => setPreferences(prev => ({ ...prev, readingTime: e.target.value as any }))}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FiBell className="w-4 h-4 mr-2" />
                      Notifications
                    </h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">Enable push notifications for breaking news</span>
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSavePreferences}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <FiSave className="w-4 h-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Account Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Created</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(parseInt(user.id)).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Breaking News Alerts</p>
                        <p className="text-sm text-gray-500">Get notified about major news events</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Weekly Digest</p>
                        <p className="text-sm text-gray-500">Receive a weekly summary of top stories</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
