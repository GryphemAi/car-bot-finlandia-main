import { Icons } from '@/components/icons';
import { AxiosError } from 'axios';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

/* Errors */

export interface DefaultError {
  message: string;
}

export interface ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

export interface IErrorBase<T> {
  error: Error | AxiosError<T>;
  type: 'axios-error' | 'stock-error';
}

export interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: 'axios-error';
}
export interface IStockError<T> extends IErrorBase<T> {
  error: Error;
  type: 'stock-error';
}
