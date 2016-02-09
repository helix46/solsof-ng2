declare module SolsofSpa.Api.DataContext {
    interface spUnpaidInvoices_Result {
        chequeNumber: number;
        transactionDate: Date;
        amount: number;
        assetLedgerAccountID: number;
        assetLedgerAccountName: string;
        invoiceID: number;
    }
    interface spGetTransactionList_Result {
        transactionID: number;
        transactionDate: Date;
        chequeNumber: number;
        comment: string;
        transactionType: string;
        amount: number;
    }
    interface spListTimesheets_Result {
        timesheetID: number;
        weekEnding: Date;
        debtorName: string;
        minutes: number;
        comment: string;
        invoiceNumber: number;
    }
    interface spGetInvoices_Result {
        transactionID: number;
        invoiceNumber: number;
        transactionDate: Date;
        debtorName: string;
        comment: string;
        total: number;
        datePaid: Date;
    }
    interface spGetTransactionsForImport_Result {
        comment: string;
        transactionDate: Date;
        amount: number;
    }
    interface spProfitAndLoss_Result {
        ledgerAccountID: number;
        ledgerAccountType: number;
        ledgerAccountName: string;
        amount: number;
    }
    interface spBalanceSheet_Result {
        name: string;
        sumAmount: number;
        ledgerAccountType: number;
    }
    interface tblBankAccount {
        bankAccountID: number;
        name: string;
        accountNumber: string;
        ledgerAccountID: number;
        entityID: number;
        active: boolean;
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
        tblLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;
    }
    interface tblEntity {
        entityID: number;
        name: string;
        address1: string;
        address2: string;
        state: string;
        postcode: string;
        aBN: string;
        gstIncomeLedgerAccountID: number;
        cashLedgerAccountID: number;
        active: boolean;
        bankClearingLedgerAccountID: number;
        bSB: string;
        bankAccountNumber: string;
        gstExpenseLedgerAccountID: number;
        tblBankAccounts: SolsofSpa.Api.DataContext.tblBankAccount[];
        tblDebtors: SolsofSpa.Api.DataContext.tblDebtor[];
        tblLedgerAccounts: SolsofSpa.Api.DataContext.tblLedgerAccount[];
        tblTimesheets: SolsofSpa.Api.DataContext.tblTimesheet[];
        tblTimesheetLogs: SolsofSpa.Api.DataContext.tblTimesheetLog[];
        tblTransactions: SolsofSpa.Api.DataContext.tblTransaction[];
    }
    interface tblDebtor {
        debtorID: number;
        entityID: number;
        debtorName: string;
        address1: string;
        address2: string;
        state: string;
        postcode: string;
        assetLedgerAccountID: number;
        incomeLedgerAccountID: number;
        aBN: string;
        email: string;
        fax: string;
        phone: string;
        uRL: string;
        hourlyRate: number;
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
        tblLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;
        tblLedgerAccount1: SolsofSpa.Api.DataContext.tblLedgerAccount;
        tblTimesheets: SolsofSpa.Api.DataContext.tblTimesheet[];
        tblTimesheetLogs: SolsofSpa.Api.DataContext.tblTimesheetLog[];
        tblTransactionDebtors: SolsofSpa.Api.DataContext.tblTransactionDebtor[];
    }
    interface tblLedgerAccount {
        ledgerAccountID: number;
        name: string;
        ledgerAccountType: number;
        entityID: number;
        active: boolean;
        oldLedgerAccount: string;
        tblBankAccounts: SolsofSpa.Api.DataContext.tblBankAccount[];
        tblBudgetLines: SolsofSpa.Api.DataContext.tblBudgetLine[];
        tblDebtors: SolsofSpa.Api.DataContext.tblDebtor[];
        tblDebtors1: SolsofSpa.Api.DataContext.tblDebtor[];
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
        tblTransactionLines: SolsofSpa.Api.DataContext.tblTransactionLine[];
        tblTransactionLines1: SolsofSpa.Api.DataContext.tblTransactionLine[];
    }
    interface tblBudgetLine {
        budgetLineID: number;
        budgetID: number;
        ledgerAccountID: number;
        amount: number;
        tblBudget: SolsofSpa.Api.DataContext.tblBudget;
        tblLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;
    }
    interface tblBudget {
        budgetID: number;
        entityID: number;
        description: string;
        startDate: Date;
        endDate: Date;
        tblBudgetLines: SolsofSpa.Api.DataContext.tblBudgetLine[];
    }
    interface tblTransactionLine {
        transactionLineID: number;
        transactionID: number;
        ledgerAccountID: number;
        amount: number;
        comment: string;
        hidden: boolean;
        timesheetID: number;
        tblLedgerAccount: SolsofSpa.Api.DataContext.tblLedgerAccount;
        tblLedgerAccount1: SolsofSpa.Api.DataContext.tblLedgerAccount;
        tblTransaction: SolsofSpa.Api.DataContext.tblTransaction;
        tblTransactionLineInvoices: SolsofSpa.Api.DataContext.tblTransactionLineInvoice[];
        tblTransactionLineTimesheets: SolsofSpa.Api.DataContext.tblTransactionLineTimesheet[];
    }
    interface tblTransaction {
        transactionID: number;
        entityID: number;
        bankAccountID: number;
        transactionType: number;
        chequeNumber: number;
        comment: string;
        transactionDate: Date;
        entryDate: Date;
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
        tblTransactionDebtors: SolsofSpa.Api.DataContext.tblTransactionDebtor[];
        tblTransactionLines: SolsofSpa.Api.DataContext.tblTransactionLine[];
        tblTransactionLineInvoices: SolsofSpa.Api.DataContext.tblTransactionLineInvoice[];
    }
    interface tblTransactionDebtor {
        transactionDebtorID: number;
        transactionID: number;
        debtorID: number;
        tblDebtor: SolsofSpa.Api.DataContext.tblDebtor;
        tblTransaction: SolsofSpa.Api.DataContext.tblTransaction;
    }
    interface tblTransactionLineInvoice {
        transactionLineInvoiceID: number;
        transactionLineID: number;
        invoiceID: number;
        tblTransaction: SolsofSpa.Api.DataContext.tblTransaction;
        tblTransactionLine: SolsofSpa.Api.DataContext.tblTransactionLine;
    }
    interface tblTransactionLineTimesheet {
        transactionLineTimesheetID: number;
        transactionLineID: number;
        timesheetID: number;
        tblTimesheet: SolsofSpa.Api.DataContext.tblTimesheet;
        tblTransactionLine: SolsofSpa.Api.DataContext.tblTransactionLine;
    }
    interface tblTimesheet {
        timesheetID: number;
        entityID: number;
        weekEnding: Date;
        debtorID: number;
        comment: string;
        tblDebtor: SolsofSpa.Api.DataContext.tblDebtor;
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
        tblTimesheetLines: SolsofSpa.Api.DataContext.tblTimesheetLine[];
        tblTransactionLineTimesheets: SolsofSpa.Api.DataContext.tblTransactionLineTimesheet[];
    }
    interface tblTimesheetLine {
        timesheetLineID: number;
        timesheetID: number;
        timesheetLineDate: Date;
        startTime: number;
        finishTime: number;
        timeout: number;
        tblTimesheet: SolsofSpa.Api.DataContext.tblTimesheet;
    }
    interface tblTimesheetLog {
        timesheetLogID: number;
        logDateTime: Date;
        logon: boolean;
        entityID: number;
        debtorID: number;
        tblDebtor: SolsofSpa.Api.DataContext.tblDebtor;
        tblEntity: SolsofSpa.Api.DataContext.tblEntity;
    }
}
declare module SolsofSpa.Helper {
    interface tblBankAccountLite {
        bankAccountID: number;
        name: string;
        ledgerAccountID: number;
    }
    interface structLoadTransactionForm {
        bankAccounts: SolsofSpa.Helper.tblBankAccountLite[];
        gstExpenseLedgerAccountID: number;
        gstExpenseLedgerAccountName: string;
        gstIncomeLedgerAccountID: number;
        gstIncomeLedgerAccountName: string;
    }
    interface structTransactionLine {
        ledgerAccountID: number;
        ledgerAccountName: string;
        debitOrCredit: string;
        amount: number;
        debit: boolean;
        comment: string;
        hidden: boolean;
        timesheetID: number;
        invoiceID: number;
    }
    interface structTransactionListItem {
        transactionID: number;
        transactionDate: Date;
        chequeNumber: number;
        comment: string;
        transactionType: string;
        amount: number;
        total: number;
    }
    interface structTransaction {
        transactionID: number;
        entityID: number;
        bankAccountID: number;
        debtorID: number;
        transactionType: SolsofSpa.Helper.enumTransactionType;
        chequeNumber: number;
        comment: string;
        sTransactionDate: string;
        transactionLineArray: SolsofSpa.Helper.structTransactionLine[];
    }
    interface structTransactionsForImport {
        comment: string;
        sTransactionDate: string;
        amount: number;
    }
    interface structImportBankTransactions {
        bankClearingLedgerAccountID: number;
        importedTransactions: SolsofSpa.Helper.structTransactionsForImport[];
    }
    interface structTimesheetLine {
        sTimesheetLineDate: string;
        startTimeMinutes: number;
        finishTimeMinutes: number;
        timeoutMinutes: number;
    }
    interface structTimesheet {
        timesheetID: number;
        entityID: number;
        sWeekEnding: string;
        debtorID: number;
        comment: string;
        timesheetLineArray: SolsofSpa.Helper.structTimesheetLine[];
    }
    interface structTimesheetInvoiceLine {
        debtorID: number;
        comment: string;
        amount: number;
        incomeLedgerAccountID: number;
        incomeLedgerAccountName: string;
        timesheetID: number;
        gstIncomeLedgerAccountID: number;
        gstIncomeLedgerAccountName: string;
        transactionType: SolsofSpa.Helper.enumTransactionType;
    }
    interface structImportBankTransactionsMultiSelect {
        entityID: number;
        bankAccountID: number;
        ledgerAccountId: number;
        selectedTransactions: SolsofSpa.Helper.structMultiSelectTransaction[];
    }
    interface structMultiSelectTransaction {
        comment: string;
        sTransactionDate: string;
        amount: number;
    }

    export const enum enumTransactionType {
        Cheque = 0,
        Deposit = 1,
        BankStatementTransaction = 3,
        GeneralJournal = 4,
        Invoice = 5,
        PayInvoice = 6
    }
    export const enum ledgerAccountType {
        Asset = 1,
        Liability = 2,
        Capital = 3,
        Income = 4,
        Expense = 5
    }
}

declare module modSharedTypes {
    export interface IHttpParameter {
        name: string,
        value: string
    }
}

interface ITokenresponse {
    access_token: string,
    expires_in: number,
    token_type: string
}

interface IChangePasswordModel {
    userName: string;
    currentPassword: string;
    newPassword: string;
}

//interface StructTimesheetLineJs {
//    timesheetLineDate: Date;
//    sStartTime: string; // for display only
//    sFinishTime: string;// for display only
//    sTimeout: string;// for display only
//    startTimeMinutes: number;
//    finishTimeMinutes: number;
//    timeoutMinutes: number;
//}
