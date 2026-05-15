import { PageHeader } from '@/components/shell/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AccountTab,
  AppearanceTab,
  ConnectedAccountsTab,
  NotificationsTab,
  PrivacyTab,
  StudyPrefsTab,
  SubscriptionTab,
} from '@/features/settings';
import { getSession } from '@/lib/data';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');
  return (
    <>
      <PageHeader eyebrow="Account" title="Settings" />
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-transparent p-0">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="study-prefs">Study Preferences</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy &amp; Data</TabsTrigger>
          <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountTab user={session.user} />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionTab />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="study-prefs">
          <StudyPrefsTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacyTab />
        </TabsContent>
        <TabsContent value="connected">
          <ConnectedAccountsTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
