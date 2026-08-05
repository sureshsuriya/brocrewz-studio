import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Info, HelpCircle, Briefcase, Users, MessageSquare, Settings, LayoutDashboard, FileImage, ShieldAlert } from 'lucide-react';
import './CommandPalette.css';

interface CommandPaletteProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="command-palette-dialog">
      <div className="command-palette-overlay" onClick={() => setOpen(false)} />
      <div className="command-palette-content">
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search size={20} className="text-white/50 mr-3" />
          <Command.Input placeholder="Type a command or search..." className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30" />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-white/50 text-sm">No results found.</Command.Empty>
          
          <Command.Group heading="Navigation">
            <Command.Item onSelect={() => runCommand(() => navigate('/admin'))}>
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/media'))}>
              <FileImage className="mr-2 h-4 w-4" /> Media Library
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/crm'))}>
              <MessageSquare className="mr-2 h-4 w-4" /> CRM & Messages
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Content Management">
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/home'))}>
              <Home className="mr-2 h-4 w-4" /> Home Page
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/about'))}>
              <Info className="mr-2 h-4 w-4" /> About Page
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/services'))}>
              <Briefcase className="mr-2 h-4 w-4" /> Services
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/portfolio'))}>
              <Briefcase className="mr-2 h-4 w-4" /> Portfolio
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/team'))}>
              <Users className="mr-2 h-4 w-4" /> Team Members
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/testimonials'))}>
              <MessageSquare className="mr-2 h-4 w-4" /> Testimonials
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/faq'))}>
              <HelpCircle className="mr-2 h-4 w-4" /> FAQ
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Settings">
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/site'))}>
              <Settings className="mr-2 h-4 w-4" /> Site Settings
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/users'))}>
              <Users className="mr-2 h-4 w-4" /> User Settings
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate('/admin/activities'))}>
              <ShieldAlert className="mr-2 h-4 w-4" /> Activity Logs
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
