import { DecimalPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAdminStats } from '@/app/shared/interfaces';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { ISummaryItem } from '../interfaces';
import { COMMITTEE_STATUS_LABELS, VOLUNTEER_STATUS_LABELS } from '../data';

@Component({
  templateUrl: './stats.html',
  imports: [ChartComponent, DecimalPipe, MatButtonModule, MatCardModule, MatIconModule]
})
export default class Stats {
  readonly statsResource = httpResource<{ data: IAdminStats }>(() => '/admin/stats');

  readonly areaChart: ApexChart = {
    type: 'area',
    height: 320,
    fontFamily: 'Inter, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false }
  };
  readonly donutChart: ApexChart = {
    type: 'donut',
    height: 300,
    fontFamily: 'Inter, sans-serif'
  };
  readonly barChart: ApexChart = {
    type: 'bar',
    height: 340,
    fontFamily: 'Inter, sans-serif',
    toolbar: { show: false }
  };
  readonly colors = ['#2563eb', '#f59e0b'];
  readonly jobColors = [this.colors[0]];
  readonly teamColors = [this.colors[1]];
  readonly committeeStatusColors = ['#2563eb', '#7c3aed', '#f59e0b', '#16a34a', '#dc2626'];
  readonly volunteerStatusColors = ['#2563eb', '#7c3aed', '#16a34a', '#f59e0b', '#dc2626', '#0891b2', '#4f46e5'];
  readonly chartStroke: ApexStroke = { curve: 'smooth', width: 3 };
  readonly chartGrid: ApexGrid = { borderColor: '#e5e7eb', strokeDashArray: 4 };
  readonly chartLegend: ApexLegend = { position: 'bottom', fontSize: '12px' };
  readonly chartTooltip: ApexTooltip = { shared: true, intersect: false };
  readonly chartDataLabels: ApexDataLabels = { enabled: false };
  readonly donutPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '68%',
        labels: {
          show: true,
          total: { show: true, label: 'Total' }
        }
      }
    }
  };
  readonly barPlotOptions: ApexPlotOptions = {
    bar: { horizontal: true, borderRadius: 4, barHeight: '60%' }
  };
  readonly countAxis: ApexYAxis = {
    min: 0,
    forceNiceScale: true,
    labels: { formatter: (value) => Math.round(value).toLocaleString('fr-FR') }
  };

  readonly summary = computed<ISummaryItem[]>(() => {
    if (!this.statsResource.hasValue()) {
      return [];
    }

    const stats = this.statsResource.value().data;

    return [
      {
        title: 'Comité',
        description: 'Candidatures au comité',
        icon: 'briefcase-business',
        value: stats.committeeTotal
      },
      {
        title: 'Volontaires',
        description: 'Candidatures volontaires',
        icon: 'users',
        value: stats.volunteerTotal
      },
      {
        title: 'Cette semaine',
        description: 'Nouvelles candidatures',
        icon: 'calendar-days',
        value: stats.thisWeek
      },
      {
        title: 'Semaine dernière',
        description: 'Candidatures enregistrées',
        icon: 'history',
        value: stats.lastWeek
      }
    ];
  });

  readonly weekEvolution = computed(() => {
    if (!this.statsResource.hasValue()) {
      return null;
    }

    const { lastWeek, thisWeek } = this.statsResource.value().data;

    if (lastWeek === 0) {
      return thisWeek === 0 ? 0 : null;
    }

    return ((thisWeek - lastWeek) / lastWeek) * 100;
  });

  readonly activitySeries = computed<ApexAxisChartSeries>(() => {
    const days = this.statsResource.hasValue()
      ? [...this.statsResource.value().data.byDay].sort((first, second) => first.date.localeCompare(second.date))
      : [];

    return [
      { name: 'Comité', data: days.map((day) => day.committee) },
      { name: 'Volontaires', data: days.map((day) => day.volunteer) }
    ];
  });

  readonly activityAxis = computed<ApexXAxis>(() => ({
    categories: this.statsResource.hasValue()
      ? [...this.statsResource.value().data.byDay]
          .sort((first, second) => first.date.localeCompare(second.date))
          .map((day) => this.formatDate(day.date))
      : [],
    labels: { rotate: -35, hideOverlappingLabels: true },
    axisBorder: { show: false },
    axisTicks: { show: false }
  }));

  readonly committeeStatusSeries = computed<ApexNonAxisChartSeries>(() => {
    if (!this.statsResource.hasValue()) {
      return [];
    }

    const status = this.statsResource.value().data.committeeByStatus;
    return [status.RECEIVED, status.SHORTLISTED, status.INTERVIEW, status.SELECTED, status.REJECTED];
  });

  readonly volunteerStatusSeries = computed<ApexNonAxisChartSeries>(() => {
    if (!this.statsResource.hasValue()) {
      return [];
    }

    const status = this.statsResource.value().data.volunteerByStatus;
    return [
      status.RECEIVED,
      status.SHORTLISTED,
      status.SELECTED,
      status.WAITLIST,
      status.REJECTED,
      status.ASSIGNED,
      status.TRAINED
    ];
  });

  readonly committeeStatusLabels = COMMITTEE_STATUS_LABELS;
  readonly volunteerStatusLabels = VOLUNTEER_STATUS_LABELS;

  readonly jobSeries = computed<ApexAxisChartSeries>(() => [
    {
      name: 'Candidatures',
      data: this.statsResource.hasValue()
        ? [...this.statsResource.value().data.committeeByJob]
            .sort((first, second) => second.count - first.count)
            .slice(0, 8)
            .map((job) => job.count)
        : []
    }
  ]);

  readonly jobAxis = computed<ApexXAxis>(() => ({
    categories: this.statsResource.hasValue()
      ? [...this.statsResource.value().data.committeeByJob]
          .sort((first, second) => second.count - first.count)
          .slice(0, 8)
          .map((job) => job.title)
      : [],
    labels: { formatter: (value) => Math.round(Number(value)).toLocaleString('fr-FR') }
  }));

  readonly teamSeries = computed<ApexAxisChartSeries>(() => [
    {
      name: 'Candidatures',
      data: this.statsResource.hasValue()
        ? [...this.statsResource.value().data.volunteerByTeam]
            .sort((first, second) => second.count - first.count)
            .map((team) => team.count)
        : []
    }
  ]);

  readonly teamAxis = computed<ApexXAxis>(() => ({
    categories: this.statsResource.hasValue()
      ? [...this.statsResource.value().data.volunteerByTeam]
          .sort((first, second) => second.count - first.count)
          .map((team) => team.name)
      : [],
    labels: { formatter: (value) => Math.round(Number(value)).toLocaleString('fr-FR') }
  }));

  private formatDate(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(date);
  }
}
