
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "search",
    label: "Chercher dans le menu",
    icon: "🔍",
    path: "/admin/search"
  },
  {
    id: "objects",
    label: "Objets",
    icon: "📦",
    children: []
  },
  {
    id: "assistance",
    label: "Assistance",
    icon: "🎧",
    children: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        icon: "📊",
        path: "/admin"
      },
      {
        id: "tickets",
        label: "Tickets",
        icon: "🎫",
        path: "/admin/tickets"
      },
      {
        id: "create-ticket",
        label: "Créer un ticket",
        icon: "➕",
        path: "/admin/tickets/create"
      },
      {
        id: "courriers",
        label: "Courriers",
        icon: "📧",
        path: "/admin/courriers"
      },
      {
        id: "audiences",
        label: "Audiences",
        icon: "👥",
        path: "/admin/audiences"
      },
      {
        id: "planning",
        label: "Planning",
        icon: "📅",
        path: "/admin/planning"
      },
      {
        id: "statistics",
        label: "Statistiques",
        icon: "📈",
        path: "/admin/statistics"
      },
      {
        id: "recurring-tickets",
        label: "Tickets récurrents",
        icon: "🔄",
        path: "/admin/tickets/recurring"
      },
      {
        id: "recurring-audiences",
        label: "Audiences récurrentes",
        icon: "🔄",
        path: "/admin/audiences/recurring"
      },
      {
        id: "forms",
        label: "Formulaires",
        icon: "📝",
        path: "/admin/forms"
      }
    ]
  },
  {
    id: "management",
    label: "Gestion",
    icon: "⚙️",
    children: []
  },
  {
    id: "tools",
    label: "Outils",
    icon: "🔧",
    children: []
  },
  {
    id: "plugins",
    label: "Plugins",
    icon: "🧩",
    children: []
  },
  {
    id: "administration",
    label: "Administration",
    icon: "👨‍💼",
    children: [
      {
        id: "users",
        label: "Utilisateurs",
        icon: "👤",
        path: "/admin/users"
      },
      {
        id: "groups",
        label: "Groupes",
        icon: "👥",
        path: "/admin/groups"
      },
      {
        id: "entities",
        label: "Entités",
        icon: "🏢",
        path: "/admin/entities"
      },
      {
        id: "rules",
        label: "Règles",
        icon: "📋",
        path: "/admin/rules"
      },
      {
        id: "dictionaries",
        label: "Dictionnaires",
        icon: "📚",
        path: "/admin/dictionaries"
      },
      {
        id: "profiles",
        label: "Profils",
        icon: "👤",
        path: "/admin/profiles"
      },
      {
        id: "notification-queue",
        label: "File d'attente des notifications",
        icon: "🔔",
        path: "/admin/notifications/queue"
      },
      {
        id: "logs",
        label: "Journaux",
        icon: "📄",
        path: "/admin/logs"
      },
      {
        id: "inventory",
        label: "Inventaire",
        icon: "📦",
        path: "/admin/inventory"
      },
      {
        id: "forms-admin",
        label: "Formulaires",
        icon: "📝",
        path: "/admin/forms-admin"
      }
    ]
  },
  {
    id: "configuration",
    label: "Configuration",
    icon: "⚙️",
    children: []
  }
];

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>(["assistance", "administration"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.path);

    if (hasChildren) {
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton 
            onClick={() => toggleExpanded(item.id)}
            className={cn(
              "w-full justify-between",
              level > 0 && "ml-4"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              {state !== "collapsed" && <span>{item.label}</span>}
            </div>
            {state !== "collapsed" && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </SidebarMenuButton>
          
          {isExpanded && state !== "collapsed" && (
            <SidebarMenuSub>
              {item.children?.map(child => (
                <SidebarMenuSubItem key={child.id}>
                  {child.children ? (
                    renderMenuItem(child, level + 1)
                  ) : (
                    <SidebarMenuSubButton 
                      onClick={() => child.path && navigate(child.path)}
                      className={cn(
                        "w-full justify-start",
                        active && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <span className="text-sm mr-2">{child.icon}</span>
                      <span>{child.label}</span>
                    </SidebarMenuSubButton>
                  )}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton 
          onClick={() => item.path && navigate(item.path)}
          className={cn(
            "w-full justify-start",
            level > 0 && "ml-4",
            active && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <span className="text-sm mr-2">{item.icon}</span>
          {state !== "collapsed" && <span>{item.label}</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r bg-green-600 text-white">
      <SidebarContent className="bg-green-600">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 font-semibold mb-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map(item => renderMenuItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
