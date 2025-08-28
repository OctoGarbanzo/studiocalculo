
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
} from '@/components/ui/sidebar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Infinity, Target, TrendingUp, Menu, Atom, Divide } from 'lucide-react';
import { IntegralIcon } from '@/components/icons';
import { ModuleContent } from '@/components/calculus-cove/module-content';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/hooks/use-language';

const modules_en = [
  { id: 'limits', title: 'Limits and Continuity', icon: Infinity },
  { id: 'trig-limits', title: 'Trigonometric Limits', icon: Atom },
  { id: 'infinity-limits', title: 'Limits at Infinity', icon: Divide },
  { id: 'derivatives', title: 'Derivatives', icon: TrendingUp },
  { id: 'applications-of-derivatives', title: 'Applications of the Derivative', icon: Target, comingSoon: true },
  { id: 'integrals', title: 'Integrals', icon: IntegralIcon, comingSoon: true },
  { id: 'applications-of-integrals', title: 'Applications of Integrals', icon: AreaChart, comingSoon: true },
];

const modules_es = [
    { id: 'limits', title: 'Límites y Continuidad', icon: Infinity },
    { id: 'trig-limits', title: 'Límites Trigonométricos', icon: Atom },
    { id: 'infinity-limits', title: 'Límites al Infinito', icon: Divide },
    { id: 'derivatives', title: 'Derivadas', icon: TrendingUp },
    { id: 'applications-of-derivatives', title: 'Aplicaciones de la Derivada', icon: Target, comingSoon: true },
    { id: 'integrals', title: 'Integrales', icon: IntegralIcon, comingSoon: true },
    { id: 'applications-of-integrals', title: 'Aplicaciones de Integrales', icon: AreaChart, comingSoon: true },
  ];

export function Dashboard() {
    const { language } = useLanguage();
    const modules = language === 'en' ? modules_en : modules_es;

  const [selectedModule, setSelectedModule] = React.useState(modules[0].id);
  const activeModule = modules.find((m) => m.id === selectedModule) || modules[0];

  const sidebarContent = (
    <>
      <SidebarHeader>
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="p-2 flex-row items-center gap-3">
            <div className="bg-primary/20 text-primary p-2 rounded-lg">
              <IntegralIcon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Rincón del Cálculo</CardTitle>
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
                tooltip={module.comingSoon ? `${module.title} (Próximamente)` : module.title}
              >
                <module.icon className="w-5 h-5" />
                <span>{module.title}</span>
                {module.comingSoon && <span className="text-xs text-muted-foreground ml-auto">(Próx.)</span>}
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
            <span className="font-bold text-lg">Rincón del Cálculo</span>
         </div>
        <div className="flex items-center gap-2">
            <LanguageSwitcher />
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
      </div>
      <div className="flex">
        <Sidebar className="hidden md:flex" collapsible="icon">
            {sidebarContent}
        </Sidebar>
        <SidebarInset className="flex-1">
            <div className='hidden md:flex justify-end p-4'>
                <LanguageSwitcher />
            </div>
          <ModuleContent key={activeModule.id} module={activeModule} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
