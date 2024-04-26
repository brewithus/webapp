import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and then merges them with tailwind-merge.
 * This function allows for dynamic class name generation with conditional
 * and grouped class names support, optimized for Tailwind CSS.
 * This function is mostly used by `shadcn/ui` components.
 * @param inputs - An array of class values to be combined and merged.
 * @returns The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param {Array<T>} array - The input array to be chunked.
 * @param {number} size - The desired size of each chunk.
 * @returns {Array<Array<T>>} - A 2D array containing the chunked elements.
 * @template T
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce((chunks, item, index) => {
    if (index % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, [] as T[][]);
}
