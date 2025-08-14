'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Infinity, Target, TrendingUp, Menu } from 'lucide-react';
import { IntegralIcon } from '@/components/icons';
import { ModuleContent } from '@/components/calculus-cove/module-content';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const modules = [
  { id: 'limits', title: 'Limits and Continuity', icon: Infinity, comingSoon: true },
  { id: 'derivatives', title: 'Derivatives', icon: TrendingUp },
  { id: 'applications-of-derivatives', title: 'Applications of the Derivative', icon: Target, comingSoon: true },
  { id: 'integrals', title: 'Integrals', icon: IntegralIcon, comingSoon: true },
  { id: 'applications-of-integrals', title: 'Applications of Integrals', icon: AreaChart, comingSoon: true },
];

export function Dashboard() {
  const [selectedModule, setSelectedModule] = React.useState(modules[1].id);
  const activeModule = modules.find((m) => m.id === selectedModule) || modules[1];

  const sidebarContent = (
    <>
      <SidebarHeader>
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="p-2 flex-row items-center gap-3">
            <div className="bg-primary/20 text-primary p-2 rounded-lg">
              <IntegralIcon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Calculus Cove</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {modules.map((module) => (
            <SidebarMenuItem key={module.id}>
              <SidebarMenuButton
                onClick={() => setSelectedModule(module.id)}
                isActive={selectedModule === module.id}
                disabled={module.comingSoon}
                tooltip={module.comingSoon ? `${module.title} (Coming Soon)` : module.title}
              >
                <module.icon className="w-5 h-5" />
                <span>{module.title}</span>
                {module.comingSoon && <span className="text-xs text-muted-foreground ml-auto">(Soon)</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );

  return (
    <SidebarProvider>
      <div className="md:hidden p-4 flex justify-between items-center bg-card border-b">
         <div className="flex items-center gap-2">
            <IntegralIcon className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Calculus Cove</span>
         </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar>
                {sidebarContent}
            </Sidebar>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex">
        <Sidebar className="hidden md:flex" collapsible="icon">
            {sidebarContent}
        </Sidebar>
        <SidebarInset className="flex-1">
          <ModuleContent key={activeModule.id} module={activeModule} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
