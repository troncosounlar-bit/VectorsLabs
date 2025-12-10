// Este archivo mantiene la compatibilidad con imports existentes
// El código real ahora está organizado en módulos dentro de /utils/pseint/

export { 
  convertPseintToJS, 
  getExampleConversion,
  type ConversionResult,
  type ErrorDetail 
} from './pseint/index';
