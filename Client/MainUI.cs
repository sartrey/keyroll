using System;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class MainUI : Sartrey.UI.WinForms.View
    {
        public MainUI()
        {
            InitializeComponent();
        }

        protected override void OnViewClosing(FormClosingEventArgs e)
        {
            if (e.CloseReason != CloseReason.ApplicationExitCall)
            {
                e.Cancel = true;
                Application.Exit();
            }
            base.OnViewClosing(e);
        }

        private void BtnCreateStorage_Click(object sender, EventArgs e)
        {

        }
    }
}
