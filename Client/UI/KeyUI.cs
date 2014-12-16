using System;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KeyUI : Sartrey.UI.WinForms.View
    {
        public string NewKey 
        {
            get { return TxtNewKey.InputText; }
        }
        public string OldKey
        {
            get { return TxtOldKey.InputText; }
        }

        public KeyUI()
        {
            InitializeComponent();
        }

        private void BtnConfirm_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(TxtNewKey.InputText))
            {
                MessageBox.Show("null or empty key is NOT accepted");
                return;
            }
            FinishDialog(DialogResult.OK);
        }

        private void BtnCancel_Click(object sender, EventArgs e)
        {
            FinishDialog(DialogResult.Cancel);
        }
    }
}
