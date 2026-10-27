import type { PaginaPontos, Ponto } from '../types/ponto';
import { get } from './api';

export async function listarPontos(page: number = 0, size: number = 20): Promise<PaginaPontos> {
  return get<PaginaPontos>(`/pontos?page=${page}&size=${size}`);
}

export async function buscarPontoPorId(id: number): Promise<Ponto> {
  return get<Ponto>(`/pontos/${id}`);
}