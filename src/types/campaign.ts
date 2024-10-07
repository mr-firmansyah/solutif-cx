interface CampaignList {
  id: string;
  campaignNumber: string;
  namaCampaign: string;
  tanggalCallMulai: null;
  tanggalCallSelesai: null;
  description: string;
  script: string;
  campaignOwner: null;
  type: string;
  totalParticipant: null;
  actualCost: null;
  expectedRevenue: null;
  expectedResponse: null;
  numSent: null;
  numConnected: null;
  numOffered: null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  callGroup: string;
  dialingModeOption: null;
  genesysID: string;
  genesysContactListid: string;
  status: null;
  planStartDate: Date;
  targetCloseDate: Date;
  category: string;
  leadsCount: number;
}

interface CampaignDetails extends CampaignList {
  actualStart: string;
  startedBy: string;
  endedBy: string;
  actualEnd: string;
}