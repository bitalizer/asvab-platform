import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Briefcase,
  Calculator,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  Cog,
  Download,
  FileText,
  Flag,
  Flame,
  FunctionSquare,
  Gauge,
  GitBranch,
  GripVertical,
  HelpCircle,
  Home,
  Layers,
  LogOut,
  type LucideIcon,
  Mail,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Play,
  RefreshCw,
  Search,
  Settings,
  Shapes,
  Sparkles,
  Sun,
  Target,
  Timer,
  Trophy,
  X,
  Zap,
} from 'lucide-react';

const ICON_MAP = {
  arrow: ArrowRight,
  arrowLeft: ArrowLeft,
  bell: Bell,
  bolt: Zap,
  book: BookOpen,
  bookmark: Bookmark,
  briefcase: Briefcase,
  calc: Calculator,
  calendar: CalendarIcon,
  cards: Layers,
  chart: BarChart3,
  chat: MessageCircle,
  check: Check,
  chevronDown: ChevronDown,
  cog: Cog,
  dot: GripVertical,
  download: Download,
  file: FileText,
  flag: Flag,
  flame: Flame,
  function: FunctionSquare,
  gauge: Gauge,
  gear: Cog,
  github: GitBranch,
  help: HelpCircle,
  home: Home,
  logout: LogOut,
  mail: Mail,
  moon: Moon,
  more: MoreHorizontal,
  paragraph: FileText,
  play: Play,
  refresh: RefreshCw,
  search: Search,
  settings: Settings,
  shapes: Shapes,
  sparkles: Sparkles,
  sun: Sun,
  target: Target,
  timer: Timer,
  trophy: Trophy,
  wrench: Cog,
  atom: Sparkles,
  x: X,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
};

export function Icon({ name, size = 16, className, strokeWidth = 1.75, color }: IconProps) {
  const Cmp = ICON_MAP[name];
  return (
    <Cmp
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      color={color}
      aria-hidden="true"
    />
  );
}
