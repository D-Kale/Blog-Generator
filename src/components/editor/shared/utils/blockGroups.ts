/**
 * Utilidades para manejo de grupos de bloques
 * Permite seleccionar y mover múltiples bloques a la vez
 */

export interface BlockGroup {
  id: string;
  blockIds: string[];
  name?: string;
}

/**
 * Agrupa bloques seleccionados
 */
export const createGroup = (
  blockIds: string[],
  name?: string
): BlockGroup => ({
  id: crypto.randomUUID(),
  blockIds,
  name
});

/**
 * Desagrupa un grupo existente
 */
export const ungroup = (groups: BlockGroup[], groupId: string): BlockGroup[] => {
  return groups.filter(g => g.id !== groupId);
};

/**
 * Obtiene los bloques que pertenecen a un grupo
 */
export const getGroupBlocks = (
  blocks: Array<{ id: string; x: number; y: number }>,
  group: BlockGroup
) => {
  return blocks.filter(block => group.blockIds.includes(block.id));
};

/**
 * Mueve todos los bloques de un grupo
 */
export const moveGroup = (
  blocks: Array<{ id: string; x: number; y: number }>,
  group: BlockGroup,
  dx: number,
  dy: number
): { id: string; x: number; y: number }[] => {
  const groupBlocks = getGroupBlocks(blocks, group);
  
  return groupBlocks.map(block => ({
    ...block,
    x: block.x + dx,
    y: block.y + dy
  }));
};

/**
 * Verifica si un bloque pertenece a algún grupo
 */
export const isBlockInGroup = (
  blockId: string,
  groups: BlockGroup[]
): boolean => {
  return groups.some(group => group.blockIds.includes(blockId));
};

/**
 * Obtiene el grupo al que pertenece un bloque
 */
export const getGroupForBlock = (
  blockId: string,
  groups: BlockGroup[]
): BlockGroup | null => {
  const group = groups.find(g => g.blockIds.includes(blockId));
  return group || null;
};
