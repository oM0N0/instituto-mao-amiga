import type { Page, Ponto } from '../types/ponto';
import { get } from './api';

export async function listarPontos(nome: string = '', page: number = 0, size: number = 20): Promise<Page<Ponto>> {
  return get<Page<Ponto>>(`/pontos/filtro?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}`);
}

export async function buscarPontoPorId(id: string): Promise<Ponto> {
  return get<Ponto>(`/pontos/${id}`);
}