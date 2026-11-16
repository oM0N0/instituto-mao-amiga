import type { Doacao, DoacaoRequest } from '../types/doacao';
import type { Page } from '../types/ponto';
import { del, get, post, put } from './api';

export async function buscarPaginaDoacoes(filtro: string = '', page: number = 0, size: number = 10): Promise<Page<Doacao>> {
  return get<Page<Doacao>>(`/api/v1/doacoes/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`);
}

export async function buscarDoacaoPorId(id: string): Promise<Doacao> {
  return get<Doacao>(`/api/v1/doacoes/${id}`);
}

export async function cadastrarDoacao(dados: DoacaoRequest): Promise<Doacao> {
  return post<Doacao>('/api/v1/doacoes', dados);
}

export async function editarDoacao(id: string, dados: DoacaoRequest): Promise<Doacao> {
  return put<Doacao>(`/api/v1/doacoes/${id}`, dados);
}

export async function excluirDoacao(id: string): Promise<void> {
  return del(`/api/v1/doacoes/${id}`);
}
