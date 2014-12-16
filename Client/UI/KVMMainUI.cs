using Keyroll.KVM;
using System;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KVMMainUI : Sartrey.UI.WinForms.View
    {
        private Memory _Model = null;

        public Memory Model 
        {
            get { return _Model; }
            set { _Model = value; }
        }

        public Control SubView 
        {
            get 
            {
                if (MainPanel.Controls.Count > 0)
                    return MainPanel.Controls[0];
                return null;
            }
        }

        public KVMMainUI()
        {
            InitializeComponent();
        }

        protected override void OnLoad(EventArgs e)
        {
            LoadModel();
            base.OnLoad(e);
        }

        private void LoadModel() 
        {
            TrvKVM.Nodes.Clear();
            var root_node = new TreeNode("Memory");
            TrvKVM.Nodes.Add(root_node);
            if (_Model == null)
                return;
            foreach (var domain in _Model.Domains) 
            {
                var domain_node = new TreeNode();
                domain_node.Tag = domain.Name;
                domain_node.Text = domain.Name;
                foreach (var record in domain.Records) 
                {
                    var record_node = new TreeNode();
                    record_node.Tag = record.Key;
                    record_node.Text = record.Key;
                    domain_node.Nodes.Add(record_node);
                }
                root_node.Nodes.Add(domain_node);
            }
        }

        private void BtnAddItem_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            if (node.Level == 0)
            {
            }
            else 
            {
            }
        }

        private void BtnRemoveItem_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
        }

        private void TrvKVM_AfterSelect(object sender, TreeViewEventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            var view = SubView;
            if (view != null)
            {
                view.Dispose();
                MainPanel.Controls.Clear();
            }
            if (node.Level == 0)
            {
                var ui = new KVMMemoryUI();
                ui.Model = _Model;
                view = ui;
            }
            else if (node.Level == 1)
            {
                var ui = new KVMDomainUI();
                ui.Model = _Model[(string)node.Tag];
                view = ui;
            }
            else if (node.Level == 2)
            {
                var ui = new KVMRecordUI();
                ui.Model = _Model[(string)node.Parent.Tag][(string)node.Tag];
                view = ui;
            }
            view.Dock = DockStyle.Fill;
            MainPanel.Controls.Add(view);
        }
    }
}
