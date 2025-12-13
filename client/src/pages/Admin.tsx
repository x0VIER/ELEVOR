import React from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Mail, Package, FileText, DollarSign } from "lucide-react";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: contactSubmissions, isLoading: loadingContacts } = trpc.admin.contactSubmissions.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === 'admin' }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const newSubmissions = contactSubmissions?.filter(s => s.status === 'new').length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your ELEVOR AI content and submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactSubmissions?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                {newSubmissions} new submission{newSubmissions !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">View and edit services</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Case Studies</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">View and edit case studies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pricing Plans</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">View and edit pricing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contact Submissions</CardTitle>
            <CardDescription>Latest inquiries from potential clients</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingContacts ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : contactSubmissions && contactSubmissions.length > 0 ? (
              <div className="space-y-4">
                {contactSubmissions.slice(0, 10).map((submission) => (
                  <div key={submission.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{submission.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            submission.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            submission.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {submission.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{submission.email}</p>
                        {submission.company && (
                          <p className="text-sm text-gray-500">{submission.company}</p>
                        )}
                        <p className="text-sm mt-2">{submission.message}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No contact submissions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
