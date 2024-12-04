import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Thermometer, Wind, Bell } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

export function Settings() {
  const { settings, updateSettings } = useWeatherStore();

  const handleNotificationChange = async (enabled: boolean) => {
    if (enabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSettings({ notifications: true });
        new Notification('Weather Alerts Enabled', {
          body: 'You will now receive weather alerts!',
        });
      } else {
        updateSettings({ notifications: false });
      }
    } else {
      updateSettings({ notifications: false });
    }
  };

  const handleSave = () => {
    useWeatherStore.getState().fetchAllWeatherData();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <SettingsIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Display Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <Thermometer className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Temperature Units</span>
                </label>
                <select
                  value={settings.units}
                  onChange={(e) => updateSettings({ units: e.target.value as 'celsius' | 'fahrenheit' })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="celsius">Celsius</option>
                  <option value="fahrenheit">Fahrenheit</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  {settings.theme === 'light' ? (
                    <Sun className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">Theme</span>
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
            </h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleNotificationChange(e.target.checked)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label className="ml-2 text-gray-700 dark:text-gray-300">Enable weather alerts</label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Settings</h3>
            <div>
              <label className="flex items-center">
                <Wind className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Refresh Interval (seconds)</span>
              </label>
              <select
                value={settings.refreshInterval}
                onChange={(e) => updateSettings({ refreshInterval: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}