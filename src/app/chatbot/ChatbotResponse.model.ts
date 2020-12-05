import { ChatMessage } from './ChatMessage.model';

export class ChatbotResponse {
  constructor(
    public messages: ChatMessage[],
    public type: number,
    public options: ChatbotOption[],
    public diseases: Disease[]
  ) { }
}

export class ChatbotOption {
  constructor(
    public text: string,
    public isChecked: boolean
  ) {}
}

export class ChatbotResponseRaw {
  constructor(
    public text: string[],
    public type: number,
    public options?: string[],
    public disease?: {
      result: Disease[],
      token: string
    }
  ) {}
}



export class Disease {
  'disease_group': string;
  'disease_score': number; 
  'faculty_code': string[];
  'faculty_name': string[];
  'icd10': string;
  'iri': string;
  'lab_test': string[];
  'label': string;
  'level': number;
  'ranking_score': number;
  'recommend': string;
  'severity_score': number;
}

const tung = {
  'result': [
    {
      'disease_group': 'Bệnh_khác',
      'disease_score': 0, 'faculty_code': ['DCCK13'],
      'faculty_name': ['Răng hàm mặt'],
      'icd10': 'K05',
      'iri': '<http://deepcare.io/R7gLmdSNFVTgkmL3UKLqwdu>',
      'lab_test': [],
      'label': 'Bệnh_về_nướu',
      'level': 2,
      'ranking_score': 0,
      'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyên bạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất. DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.',
      'severity_score': 5.1
    },
    {
      'disease_group': 'Bệnh hệ cơ, xương khớp và mô liên kết', 'disease_score': 0, 'faculty_code': ['DCCK13'], 'faculty_name': ['Răng hàm mặt'], 'icd10': 'K07.6', 'iri': '<http://deepcare.io/R8vbonXCqn4jeTgdDq2OfUk>', 'lab_test': [], 'label': 'Hội_chứng_khớp_thái_dương_hàm', 'level': 2, 'ranking_score': 0, 'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyênbạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất.DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.', 'severity_score': 5.083333333333334
    }
  ],
  'token': 'a2a661e8 - e276 - 46e8 - ae3f - 8056cb867325'
}

