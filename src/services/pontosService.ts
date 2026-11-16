import type { Page, Ponto, PontoRequest } from '../types/ponto';
import { del, get, post, put } from './api';

export async function listarPontos(): Promise<Ponto[]> {
  return get<Ponto[]>('/api/v1/pontos');
}

export async function buscarPagina(filtro: string = '', page: number = 0, size: number = 10): Promise<Page<Ponto>> {
  return get<Page<Ponto>>(`/api/v1/pontos/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`);
}

export async function buscarPontoPorId(id: string): Promise<Ponto> {
  return get<Ponto>(`/api/v1/pontos/${id}`);
}

export async function cadastrarPonto(dados: PontoRequest): Promise<Ponto> {
  return post<Ponto>('/api/v1/pontos', dados);
}

export async function editarPonto(id: string, dados: PontoRequest): Promise<Ponto> {
  return put<Ponto>(`/api/v1/pontos/${id}`, dados);
}

export async function excluirPonto(id: string): Promise<void> {
  return del(`/api/v1/pontos/${id}`);
}
